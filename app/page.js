"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="services">
        <Services />
      </section>
    </main>
  );
}