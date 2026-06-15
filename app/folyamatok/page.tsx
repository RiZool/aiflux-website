import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowConfigurator from "@/components/WorkflowConfigurator";

export const metadata: Metadata = {
  title: "Termékeink | AI Flux - LEGO-konfigurátor",
  description:
    "Válogass az AI termékeinkből LEGO-szerűen és kérj személyre szabott ajánlatot. Prezentáció-készítő, chatbot, social media automatizáló, hírlevél és még sok más.",
};

export default function FolyamatokPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "72px" }}>
        <WorkflowConfigurator />
      </div>
      <Footer />
    </main>
  );
}
