import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
