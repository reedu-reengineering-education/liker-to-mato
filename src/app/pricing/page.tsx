'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const tiers = [
  {
    name: 'Basic',
    price: '0',
    description: 'Perfekt für den Einstieg',
    features: [
      '5 Umfragen pro Monat',
      '100 Antworten pro Umfrage',
      'Grundlegende Auswertungen',
      'Email Support',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '29',
    description: 'Für professionelle Anwender',
    features: [
      'Unbegrenzte Umfragen',
      'Unbegrenzte Antworten',
      'Erweiterte Analysen',
      'Prioritäts-Support',
      'Eigenes Branding',
      'Export-Funktionen',
      'Team-Verwaltung',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '99',
    description: 'Für große Organisationen',
    features: [
      'Alles aus Pro',
      'Dedizierter Account Manager',
      'SLA-Garantie',
      'On-Premise Option',
      'Individuelle Anpassungen',
      'API-Zugang',
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const handlePayment = async (tier: string) => {
    // Hier kommt später die Zahlungslogik hin
    console.log(`Starting payment process for ${tier}`);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent sm:text-5xl md:text-6xl">
          Preise für jeden Bedarf
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Wählen Sie den passenden Plan für Ihre Anforderungen
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative self-center rounded-lg bg-muted p-0.5 flex sm:mt-8">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={cn(
              'relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8',
              billingInterval === 'monthly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground'
            )}
          >
            Monatlich
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={cn(
              'relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8',
              billingInterval === 'yearly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground'
            )}
          >
            Jährlich <span className="text-primary">(-20%)</span>
          </button>
        </div>
      </div>

      <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-7xl">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={cn('flex h-full flex-col', tier.highlighted && 'border-primary shadow-lg')}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                  €{tier.price}
                  <span className="ml-1 text-2xl font-medium text-muted-foreground">
                    /{billingInterval === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="ml-3 text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="space-y-4">
                <Button
                  onClick={() => handlePayment(tier.name)}
                  className="w-full"
                  variant={tier.highlighted ? 'default' : 'outline'}
                >
                  {tier.name === 'Basic' ? 'Kostenlos starten' : 'Jetzt upgraden'}
                </Button>
                {tier.name !== 'Basic' && (
                  <div className="flex justify-center gap-2 w-full">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <Image
                      src="/paypal.svg"
                      alt="PayPal"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Alle Preise zzgl. MwSt. · Jederzeit kündbar · 14 Tage Geld-zurück-Garantie
        </p>
      </div>
    </div>
  );
}
