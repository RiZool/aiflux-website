import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechLogos from "@/components/TechLogos";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Comparison from "@/components/Comparison";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WaveDivider from="#000" to="#050510" path="M0,0 C240,90 480,90 720,45 C960,0 1200,0 1440,60 L1440,90 L0,90 Z" height={90} />
      <TechLogos />
      <Services />
      <WaveDivider from="#050510" to="#08081a" path="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,30 L1440,80 L0,80 Z" height={80} />
      <Stats />
      <WaveDivider from="#08081a" to="#050510" path="M0,30 C180,0 360,70 720,40 C1080,10 1260,70 1440,20 L1440,80 L0,80 Z" height={80} />
      <Comparison />
      <WaveDivider from="#050510" to="#08081a" path="M0,40 C360,0 720,80 1080,40 C1260,20 1380,60 1440,30 L1440,80 L0,80 Z" height={80} />
      <Process />
      <WaveDivider from="#08081a" to="#050510" path="M0,30 C240,70 480,0 720,50 C960,90 1200,20 1440,50 L1440,80 L0,80 Z" height={80} />
      <Pricing />
      <WaveDivider from="#050510" to="#08081a" path="M0,30 C240,70 480,0 720,50 C960,90 1200,20 1440,50 L1440,80 L0,80 Z" height={80} />
      <FAQ />
      <Guarantee />
      <WaveDivider from="#000" to="#000" path="M0,50 C200,100 400,0 600,50 C800,100 1000,10 1200,60 C1320,85 1400,40 1440,50 L1440,100 L0,100 Z" height={100} />
      <CTA />
      <Footer />
    </main>
  );
}
