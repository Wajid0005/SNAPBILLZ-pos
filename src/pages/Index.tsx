import Hero from "@/components/Hero"
import ValueProps from "@/components/ValueProps"
import Pricing from "@/components/Pricing"
import SandboxWidget from "@/components/SandboxWidget"
import TrustLogos from "@/components/TrustLogos"
import Footer from "@/components/Footer"

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustLogos />
      <ValueProps />
      <SandboxWidget />
      <Pricing />
      <Footer />
    </main>
  );
};

export default Index;
