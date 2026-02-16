import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background hero-gradient" />
      <div className="relative max-w-4xl mx-auto text-center px-6 py-24 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Build something amazing,{" "}
          <span className="text-primary">faster than ever</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A modern platform that helps you ship beautiful products with
          confidence. Streamline your workflow, collaborate seamlessly, and
          launch with ease.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow hover:bg-primary/90 transition-colors">
            Get Started
            <ArrowRight size={16} />
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-border bg-background text-foreground px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
