"use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import Services from "@/components/Services";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
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