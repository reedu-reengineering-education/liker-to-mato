"use client";

import { Container } from "@/components/ui/layout/Container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuliere API-Aufruf
    setTimeout(() => {
      toast({
        title: "Nachricht gesendet",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
        duration: 3000,
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container as="main" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Kontaktieren Sie uns
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Haben Sie Fragen oder Anregungen? Wir sind für Sie da und freuen uns
            auf Ihre Nachricht.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kontaktinformationen */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Unsere Kontaktdaten
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">E-Mail</p>
                    <a
                      href="mailto:kontakt@likert-o-mat.de"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      kontakt@likert-o-mat.de
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telefon</p>
                    <a
                      href="tel:+49-251-83-0"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +49 (0) 251 83-0
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-muted-foreground">
                      Schlossplatz 2
                      <br />
                      48149 Münster
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Karte oder zusätzliche Informationen */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-medium mb-2">Öffnungszeiten</h3>
              <p className="text-muted-foreground">
                Montag - Freitag: 9:00 - 17:00 Uhr
                <br />
                Samstag & Sonntag: Geschlossen
              </p>
            </div>
          </motion.div>

          {/* Kontaktformular */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Max Mustermann"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    E-Mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="max@beispiel.de"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Betreff
                </label>
                <Input
                  id="subject"
                  placeholder="Wie können wir Ihnen helfen?"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nachricht
                </label>
                <Textarea
                  id="message"
                  placeholder="Ihre Nachricht an uns..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Nachricht senden
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  );
}
