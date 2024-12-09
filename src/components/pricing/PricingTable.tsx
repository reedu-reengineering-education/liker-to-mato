"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PricingFeature {
  name: string;
  basic: boolean;
  pro: boolean;
  enterprise: boolean;
}

const features: PricingFeature[] = [
  {
    name: "Unbegrenzte Umfragen",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    name: "Basis-Analytik",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    name: "Erweiterte Analytik",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Benutzerdefinierte Themes",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Export als PDF/Excel",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Prioritäts-Support",
    basic: false,
    pro: false,
    enterprise: true,
  },
  {
    name: "Individuelle Anpassungen",
    basic: false,
    pro: false,
    enterprise: true,
  },
];

interface PricingTableProps {
  currentPlan?: "basic" | "pro" | "enterprise";
  onUpgrade?: (plan: string) => void;
}

export function PricingTable({ currentPlan, onUpgrade }: PricingTableProps) {
  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <div className="grid md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <motion.div
          variants={itemAnimation}
          className={`rounded-lg p-6 ${
            currentPlan === "basic"
              ? "border-2 border-primary"
              : "border border-border"
          }`}
        >
          <h3 className="text-2xl font-bold">Basic</h3>
          <p className="text-muted-foreground mt-2">Perfekt zum Einstieg</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">€0</span>
            <span className="text-muted-foreground">/Monat</span>
          </div>
          <Button
            className="w-full mt-6"
            variant={currentPlan === "basic" ? "outline" : "default"}
            disabled={currentPlan === "basic"}
            onClick={() => onUpgrade?.("basic")}
          >
            {currentPlan === "basic" ? "Aktueller Plan" : "Auswählen"}
          </Button>
          <ul className="mt-6 space-y-4">
            {features.map((feature) => (
              <li key={feature.name} className="flex items-center gap-2">
                {feature.basic ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span
                  className={!feature.basic ? "text-muted-foreground" : undefined}
                >
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          variants={itemAnimation}
          className={`rounded-lg p-6 ${
            currentPlan === "pro"
              ? "border-2 border-primary"
              : "border border-border"
          }`}
        >
          <h3 className="text-2xl font-bold">Pro</h3>
          <p className="text-muted-foreground mt-2">Für professionelle Nutzer</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">€29</span>
            <span className="text-muted-foreground">/Monat</span>
          </div>
          <Button
            className="w-full mt-6"
            variant={currentPlan === "pro" ? "outline" : "default"}
            disabled={currentPlan === "pro"}
            onClick={() => onUpgrade?.("pro")}
          >
            {currentPlan === "pro" ? "Aktueller Plan" : "Auswählen"}
          </Button>
          <ul className="mt-6 space-y-4">
            {features.map((feature) => (
              <li key={feature.name} className="flex items-center gap-2">
                {feature.pro ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span
                  className={!feature.pro ? "text-muted-foreground" : undefined}
                >
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Enterprise Plan */}
        <motion.div
          variants={itemAnimation}
          className={`rounded-lg p-6 ${
            currentPlan === "enterprise"
              ? "border-2 border-primary"
              : "border border-border"
          }`}
        >
          <h3 className="text-2xl font-bold">Enterprise</h3>
          <p className="text-muted-foreground mt-2">Für große Organisationen</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">€99</span>
            <span className="text-muted-foreground">/Monat</span>
          </div>
          <Button
            className="w-full mt-6"
            variant={currentPlan === "enterprise" ? "outline" : "default"}
            disabled={currentPlan === "enterprise"}
            onClick={() => onUpgrade?.("enterprise")}
          >
            {currentPlan === "enterprise" ? "Aktueller Plan" : "Auswählen"}
          </Button>
          <ul className="mt-6 space-y-4">
            {features.map((feature) => (
              <li key={feature.name} className="flex items-center gap-2">
                {feature.enterprise ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span
                  className={
                    !feature.enterprise ? "text-muted-foreground" : undefined
                  }
                >
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
