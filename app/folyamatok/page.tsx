import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowConfigurator from "@/components/WorkflowConfigurator";

export const metadata: Metadata = {
  title: "AI Folyamatok | AI Flux — LEGO-konfigurátor",
  description:
    "Válogass az elkészült AI automatizációkból LEGO-szerűen és kérj személyre szabott ajánlatot. Prezentáció-készítő, chatbot, hírlevél automatizáció és még sok más.",
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
