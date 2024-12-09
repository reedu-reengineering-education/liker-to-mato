"use client";

import { Container } from "@/components/ui/layout/Container";
import { motion } from "framer-motion";
import { Shield, Scale, Mail } from "lucide-react";

export default function ImprintPage() {
  return (
    <Container as="main" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Impressum</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rechtliche Informationen und Angaben gemäß § 5 TMG
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          {/* Betreiber */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Angaben gemäß § 5 TMG
            </h2>
            <div className="bg-card rounded-lg p-6 space-y-4">
              <p>
                <strong>Betreiber:</strong>
                <br />
                Westfälische Wilhelms-Universität Münster
                <br />
                Schlossplatz 2
                <br />
                48149 Münster
              </p>
              <p>
                <strong>Vertreten durch:</strong>
                <br />
                Prof. Dr. Johannes Wessels
                <br />
                Rektor der WWU Münster
              </p>
            </div>
          </motion.section>

          {/* Kontakt */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Kontakt
            </h2>
            <div className="bg-card rounded-lg p-6 space-y-4">
              <p>
                <strong>Telefon:</strong> +49 (0) 251 83-0
                <br />
                <strong>E-Mail:</strong>{" "}
                <a
                  href="mailto:kontakt@likert-o-mat.de"
                  className="text-primary hover:underline"
                >
                  kontakt@likert-o-mat.de
                </a>
              </p>
            </div>
          </motion.section>

          {/* Rechtliches */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              Rechtliche Hinweise
            </h2>
            <div className="bg-card rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Haftung für Inhalte</h3>
                <p className="text-muted-foreground">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt
                  erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                  der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Haftung für Links</h3>
                <p className="text-muted-foreground">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder
                  Betreiber der Seiten verantwortlich.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Urheberrecht</h3>
                <p className="text-muted-foreground">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </Container>
  );
}
