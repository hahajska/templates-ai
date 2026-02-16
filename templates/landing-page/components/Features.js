import React from "react";
import { Zap, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for speed at every level. Your projects build and deploy in seconds, not minutes.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Enterprise-grade security built in from the start. Focus on building, not worrying about vulnerabilities.",
  },
  {
    icon: BarChart3,
    title: "Actionable Insights",
    description:
      "Understand how your product performs with real-time analytics and detailed reporting dashboards.",
  },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">Features</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Everything you need to go from idea to production, all in one place.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-border bg-card p-6 space-y-3 hover:shadow-md transition-shadow"
          >
            <div className="inline-flex items-center justify-center rounded-md bg-muted p-2">
              <feature.icon size={20} className="text-foreground" />
            </div>
            <h3 className="text-lg font-medium text-card-foreground">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
