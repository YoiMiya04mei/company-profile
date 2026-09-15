import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Services from '@/components/Services';
import FeaturedService from '@/components/FeaturedService';
import Network from '@/components/Network';
import Monitoring from '@/components/Monitoring';
import Coverage from '@/components/Coverage';
import Pricing from '@/components/Pricing';
import WhyChooseUs from '@/components/WhyChooseUs';
import CustomerSegments from '@/components/CustomerSegments';
import Partnership from '@/components/Partnership';
import SLA from '@/components/SLA';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <FeaturedService />
        <Network />
        <Monitoring />
        <Coverage />
        <Pricing />
        <WhyChooseUs />
        <CustomerSegments />
        <Partnership />
        <SLA />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
