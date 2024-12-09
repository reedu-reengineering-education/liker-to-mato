"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, BarChart2, Users } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Container } from "@/components/ui/layout/Container";
import { Grid } from "@/components/ui/layout/Grid";
import { cn } from "@/lib/utils";
import { LogoFull } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { data: session } = useSession();

  const features = [
    {
      title: "Intuitive Erstellung",
      description: "Erstellen Sie professionelle Umfragen in wenigen Minuten mit unserem benutzerfreundlichen Editor",
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-700",
    },
    {
      title: "Echtzeit-Analyse",
      description: "Verfolgen Sie Ergebnisse in Echtzeit mit detaillierten Statistiken und interaktiven Diagrammen",
      icon: BarChart2,
      color: "from-blue-500 to-indigo-700",
    },
    {
      title: "Zusammenarbeit",
      description: "Teilen Sie Umfragen und arbeiten Sie nahtlos im Team zusammen",
      icon: Users,
      color: "from-purple-500 to-pink-700",
    },
  ];

  const testimonials = [
    {
      quote:
        "Ein großartiges Tool für schnelles Feedback. Die Benutzeroberfläche ist intuitiv und die Ergebnisse sind präzise und leicht zu interpretieren.",
      author: "Prof. Dr. Bartolomeus Tomaschiski",
      institution: "Universität Münster",
      avatar: "BT",
    },
    {
      quote:
        "Sehr benutzerfreundlich und effizient. Likert-to-Mat hat unsere Forschungsarbeit erheblich beschleunigt und die Qualität unserer Datenerhebung verbessert.",
      author: "Dr. Jan Wahnwirth",
      institution: "Universität Münster",
      avatar: "JW",
    },
    {
      quote:
        "Eine ausgezeichnete Plattform für akademische Umfragen. Die anpassbaren Skalen und die Multimedia-Integration sind besonders nützlich für unsere Studien.",
      author: "Prof. Dr. Anke Müller",
      institution: "Technische Universität Berlin",
      avatar: "AM",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <Container as="main" className="py-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="flex justify-center mb-6">
          <LogoFull className="w-64" />
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Wissenschaftliche Umfragen
          </span>
          <br />
          <span className="text-foreground">neu gedacht</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Erstellen Sie professionelle Umfragen, sammeln Sie Feedback und analysieren Sie Ergebnisse - alles in einer modernen und intuitiven Plattform.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            asChild
            className="group"
          >
            <Link href={session ? "/dashboard" : "/auth/signin"}>
              {session ? "Zum Dashboard" : "Jetzt kostenlos starten"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
          >
            <Link href="/about">
              Mehr erfahren
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <Grid cols={3} gap="lg" className="mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 rounded-xl bg-card hover:bg-accent transition-colors group"
          >
            <div className={cn(
              "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
              "bg-gradient-to-br",
              feature.color
            )}>
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

      {/* Testimonials */}
      <div className="relative mb-20 bg-card rounded-xl p-12 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold mx-auto mb-6">
              {testimonials[currentTestimonial].avatar}
            </div>
            <p className="text-2xl mb-6 text-pretty leading-relaxed">
              "{testimonials[currentTestimonial].quote}"
            </p>
            <p className="font-semibold text-lg">
              {testimonials[currentTestimonial].author}
            </p>
            <p className="text-muted-foreground">
              {testimonials[currentTestimonial].institution}
            </p>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-gradient-to-b from-muted/50 to-background rounded-xl p-12"
      >
        <h2 className="text-3xl font-bold mb-6">
          Bereit für bessere Umfragen?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Starten Sie noch heute und erleben Sie, wie Likert-O-Mat Ihre Forschung auf das nächste Level hebt.
        </p>
        <Button
          size="lg"
          asChild
          className="group"
        >
          <Link href={session ? "/dashboard" : "/auth/signin"}>
            {session ? "Zum Dashboard" : "Kostenlos testen"}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </Container>
  );
}
