const fs = require('fs');
const zlib = require('zlib');

function processPng(inputPath, outputPath) {
  const buf = fs.readFileSync(inputPath);
  
  // Check PNG signature
  if (buf.readUInt32BE(0) !== 0x89504E47 || buf.readUInt32BE(4) !== 0x0D0A1A0A) {
    console.error('Not a valid PNG');
    return;
  }

  let pos = 8;
  let width, height, bitDepth, colorType, compressionMethod, filterMethod, interlaceMethod;
  const idatChunks = [];

  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + length);
    pos += 12 + length;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
      compressionMethod = data.readUInt8(10);
      filterMethod = data.readUInt8(11);
      interlaceMethod = data.readUInt8(12);
      console.log(`IHDR: ${width}x${height}, depth: ${bitDepth}, colorType: ${colorType}, interlace: ${interlaceMethod}`);
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    }
  }

  if (interlaceMethod !== 0) {
    console.log('Interlaced PNG not supported in simple filter');
    return;
  }

  const compressedData = Buffer.concat(idatChunks);
  const rawData = zlib.inflateSync(compressedData);
  console.log(`Decompressed size: ${rawData.length} bytes. Expected: ~${height * (1 + width * (colorType === 6 ? 4 : 3))}`);

  // Reconstruct un-filtered scanlines into RGBA
  const bytesPerPixelIn = colorType === 6 ? 4 : (colorType === 2 ? 3 : null);
  if (!bytesPerPixelIn || bitDepth !== 8) {
    console.log(`Unsupported format: colorType ${colorType}, bitDepth ${bitDepth}`);
    return;
  }

  const strideIn = 1 + width * bytesPerPixelIn;
  const rgbaData = Buffer.alloc(height * width * 4);
  const prevRow = Buffer.alloc(width * bytesPerPixelIn);
  const curRow = Buffer.alloc(width * bytesPerPixelIn);

  // Helper unfilter
  function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  }

  for (let y = 0; y < height; y++) {
    const filterType = rawData[y * strideIn];
    const rowRaw = rawData.slice(y * strideIn + 1, (y + 1) * strideIn);

    for (let x = 0; x < width * bytesPerPixelIn; x++) {
      const xVal = rowRaw[x];
      const a = x >= bytesPerPixelIn ? curRow[x - bytesPerPixelIn] : 0;
      const b = prevRow[x];
      const c = x >= bytesPerPixelIn ? prevRow[x - bytesPerPixelIn] : 0;

      if (filterType === 0) curRow[x] = xVal;
      else if (filterType === 1) curRow[x] = (xVal + a) & 0xff;
      else if (filterType === 2) curRow[x] = (xVal + b) & 0xff;
      else if (filterType === 3) curRow[x] = (xVal + Math.floor((a + b) / 2)) & 0xff;
      else if (filterType === 4) curRow[x] = (xVal + paeth(a, b, c)) & 0xff;
    }

    for (let px = 0; px < width; px++) {
      const inIdx = px * bytesPerPixelIn;
      const outIdx = (y * width + px) * 4;
      const r = curRow[inIdx];
      const g = curRow[inIdx + 1];
      const b = curRow[inIdx + 2];
      let a = bytesPerPixelIn === 4 ? curRow[inIdx + 3] : 255;

      // If white / near-white background, make transparent!
      if (r >= 238 && g >= 238 && b >= 238) {
        a = 0;
      }

      rgbaData[outIdx] = r;
      rgbaData[outIdx + 1] = g;
      rgbaData[outIdx + 2] = b;
      rgbaData[outIdx + 3] = a;
    }

    curRow.copy(prevRow);
  }

  // Also create a version for dark mode (where text/JDP is clean and bright or white/light blue)
  // Let's create the output PNG with filter 0
  function createPng(rgbaBuffer, outPath) {
    const outScanlines = Buffer.alloc(height * (1 + width * 4));
    for (let y = 0; y < height; y++) {
      outScanlines[y * (1 + width * 4)] = 0; // None filter
      rgbaBuffer.copy(outScanlines, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4);
    }
    const deflated = zlib.deflateSync(outScanlines);

    // CRC32 table
    const crcTable = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      crcTable[n] = c;
    }
    function crc32(buf) {
      let c = 0xffffffff;
      for (let i = 0; i < buf.length; i++) {
        c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
      }
      return (c ^ 0xffffffff) >>> 0;
    }

    function makeChunk(type, data) {
      const len = Buffer.alloc(4);
      len.writeUInt32BE(data.length, 0);
      const typeBuf = Buffer.from(type, 'ascii');
      const body = Buffer.concat([typeBuf, data]);
      const crc = Buffer.alloc(4);
      crc.writeUInt32BE(crc32(body), 0);
      return Buffer.concat([len, body, crc]);
    }

    const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(width, 0);
    ihdrData.writeUInt32BE(height, 4);
    ihdrData.writeUInt8(8, 8);
    ihdrData.writeUInt8(6, 9); // RGBA
    ihdrData.writeUInt8(0, 10);
    ihdrData.writeUInt8(0, 11);
    ihdrData.writeUInt8(0, 12);

    const ihdrChunk = makeChunk('IHDR', ihdrData);
    const idatChunk = makeChunk('IDAT', deflated);
    const iendChunk = makeChunk('IEND', Buffer.alloc(0));

    fs.writeFileSync(outPath, Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]));
    console.log(`Saved transparent PNG: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  }

  // 1. Save transparent logo for light mode (original colors: blue icon, blue JDP, navy text, transparent bg)
  createPng(rgbaData, outputPath);

  // 2. Also create a version for dark mode:
  // Where any non-transparent pixel that was dark navy text (#0a3761) or dark blue JDP (#1b75bb)
  // becomes bright white (#ffffff) or light cyan so it shines brilliantly on dark navy background!
  const darkRgba = Buffer.from(rgbaData);
  for (let i = 0; i < darkRgba.length; i += 4) {
    const a = darkRgba[i + 3];
    if (a > 20) {
      const r = darkRgba[i];
      const g = darkRgba[i + 1];
      const b = darkRgba[i + 2];
      // Check if this pixel is the cyan icon mark (high g and b, moderate r) vs deep blue / dark text
      const isCyan = g > 150 && b > 200;
      if (!isCyan) {
        // Turn dark text and dark JDP into bright crisp white!
        darkRgba[i] = 255;
        darkRgba[i + 1] = 255;
        darkRgba[i + 2] = 255;
      }
    }
  }
  createPng(darkRgba, outputPath.replace('.png', '-dark.png'));
}

processPng('public/logo-jdp.png', 'public/logo-jdp.png');
