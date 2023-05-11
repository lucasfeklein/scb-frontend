"use client"

import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { Inter } from "@next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash;
    
    // If there's a hash, find the corresponding element and scroll to it
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Contact />
    </>
  );
}
