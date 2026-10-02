import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

import About from '@/components/About';
import Services from '@/components/Services';
import FeaturedService from '@/components/FeaturedService';
import Network from '@/components/Network';
import Coverage from '@/components/Coverage';
import Pricing from '@/components/Pricing';
import WhyChooseUs from '@/components/WhyChooseUs';
import CustomerSegments from '@/components/CustomerSegments';
import Partnership from '@/components/Partnership';
import SLA from '@/components/SLA';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white transition-colors duration-300 selection:bg-cyan-500 selection:text-white">
        <Navbar />
        <main>
        <Hero />
        <About />
        <Network />
        <Services />
        <FeaturedService />
        <Pricing />
        <Coverage />
        <WhyChooseUs />
        <CustomerSegments />
        <Partnership />
        <SLA />
        <Testimonials />
        <FAQ />

      </main>
      <Footer />
      <WhatsAppButton />
    </div>
    </ThemeProvider>
  );
}

export default App;
