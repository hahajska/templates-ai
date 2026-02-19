import React from "react";
import { Agentation } from "agentation";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <Hero />
        <Features />
        <Footer />
      </div>
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
