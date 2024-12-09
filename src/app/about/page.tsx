"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/layout/Grid";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  Shield,
  Sparkles,
  Target,
  Users2,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      title: "Einfache Bedienung",
      description:
        "Intuitive Benutzeroberfläche für schnelles und effizientes Arbeiten",
      icon: Sparkles,
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Datensicherheit",
      description: "Höchste Standards für den Schutz Ihrer Forschungsdaten",
      icon: Shield,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Zielgerichtet",
      description: "Speziell entwickelt für wissenschaftliche Umfragen",
      icon: Target,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Zusammenarbeit",
      description: "Einfache Teamarbeit und Datenaustausch",
      icon: Users2,
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Innovation",
      description: "Moderne Technologien für bessere Ergebnisse",
      icon: Lightbulb,
      color: "from-yellow-500 to-amber-600",
    },
    {
      title: "Performance",
      description: "Schnelle und zuverlässige Datenverarbeitung",
      icon: Zap,
      color: "from-orange-500 to-red-600",
    },
  ];

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
    <Container as="main" className="py-12">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
        className="text-center mb-20"
      >
        <motion.h1
          variants={itemAnimation}
          className="text-4xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Über Likert-O-Mat
          </span>
        </motion.h1>
        <motion.p
          variants={itemAnimation}
          className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Likert-O-Mat ist eine moderne Plattform für wissenschaftliche
          Umfragen, entwickelt von Forschern für Forscher. Unser Ziel ist es,
          den Prozess der Datenerhebung und -analyse so effizient und präzise
          wie möglich zu gestalten.
        </motion.p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
        className="mb-20 bg-gradient-to-b from-muted/50 to-background rounded-xl p-12"
      >
        <motion.h2
          variants={itemAnimation}
          className="text-3xl font-bold mb-6 text-center"
        >
          Unsere Mission
        </motion.h2>
        <motion.p
          variants={itemAnimation}
          className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Wir glauben daran, dass qualitativ hochwertige Forschung zugänglich
          und effizient sein sollte. Mit Likert-O-Mat bieten wir eine Plattform,
          die modernste Technologie mit benutzerfreundlichem Design verbindet,
          um Wissenschaftlern die bestmöglichen Werkzeuge für ihre Forschung zur
          Verfügung zu stellen.
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
        className="mb-20"
      >
        <motion.h2
          variants={itemAnimation}
          className="text-3xl font-bold mb-12 text-center"
        >
          Was uns auszeichnet
        </motion.h2>
        <Grid cols={3} gap="lg">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              className="p-8 rounded-xl bg-card hover:bg-accent transition-colors group"
            >
              <div
                className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color}`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </Grid>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
        className="mb-20 text-center"
      >
        <motion.h2 variants={itemAnimation} className="text-3xl font-bold mb-6">
          Entwickelt an der Universität Münster
        </motion.h2>
        <motion.p
          variants={itemAnimation}
          className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Likert-O-Mat wurde von einem engagierten Team an der Universität
          Münster entwickelt. Wir kombinieren akademische Expertise mit
          technischer Innovation, um die bestmögliche Lösung für
          wissenschaftliche Umfragen zu schaffen.
        </motion.p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
        className="text-center bg-card rounded-xl p-12 shadow-sm"
      >
        <motion.h2 variants={itemAnimation} className="text-3xl font-bold mb-6">
          Starten Sie Ihre Forschung mit uns
        </motion.h2>
        <motion.p
          variants={itemAnimation}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Erleben Sie selbst, wie Likert-O-Mat Ihre Forschungsarbeit
          vereinfachen und verbessern kann.
        </motion.p>
        <motion.div variants={itemAnimation}>
          <Button size="lg" asChild className="group">
            <Link href="/auth/signin">
              Jetzt kostenlos starten
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
}
