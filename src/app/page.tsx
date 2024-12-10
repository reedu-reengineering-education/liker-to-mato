'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  BarChart2,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Container } from '@/components/ui/layout/Container';
import { Grid } from '@/components/ui/layout/Grid';
import { cn } from '@/lib/utils';
import { LogoFull } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { data: session } = useSession();

  const features = [
    {
      title: 'Intuitive Erstellung',
      description:
        'Erstellen Sie professionelle Umfragen in wenigen Minuten mit unserem benutzerfreundlichen Editor',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-700',
    },
    {
      title: 'Detaillierte Auswertung',
      description:
        'Analysieren Sie Ihre Ergebnisse mit aussagekräftigen Statistiken und Visualisierungen',
      icon: BarChart2,
      color: 'from-blue-500 to-indigo-700',
    },
    {
      title: 'Einfache Teilnahme',
      description: 'Teilen Sie Ihre Umfragen mit einem Klick und erreichen Sie Ihre Zielgruppe',
      icon: Users,
      color: 'from-purple-500 to-pink-700',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Container className="pt-20 pb-16 text-center lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-foreground sm:text-7xl">
            Erstellen Sie{' '}
            <span className="relative whitespace-nowrap text-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">professionelle</span>
            </span>{' '}
            Umfragen
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground">
            Likert-O-Mat ist die moderne Plattform für die Erstellung und Auswertung von
            Likert-Skala basierten Umfragen.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/auth/signin">
                Jetzt starten
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Mehr erfahren</Link>
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Container className="pt-20 pb-16">
        <Grid className="gap-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-10',
                  feature.color
                )}
              />
              <div className="relative flex h-full flex-col p-6">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
