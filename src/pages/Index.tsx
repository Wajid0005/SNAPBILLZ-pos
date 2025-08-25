import Hero from "@/components/Hero"
import ValueProps from "@/components/ValueProps"
import Pricing from "@/components/Pricing"
import SandboxWidget from "@/components/SandboxWidget"
import HonestMetrics from "@/components/HonestMetrics"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <HonestMetrics />
      <ValueProps />
      <SandboxWidget />
      <Pricing />
      <Footer />
    </main>
  );
};

export default Index;
