"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
        <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="services">
        <Services />
      </section>
      <Footer />
    </main>
  );
}