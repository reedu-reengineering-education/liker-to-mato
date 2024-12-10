'use client';

import { Container } from '@/components/ui/layout/Container';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Eye, Cookie } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <Container as="main" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Datenschutzerklärung</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Informationen zum Schutz Ihrer persönlichen Daten
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          {/* Einleitung */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Allgemeine Hinweise
            </h2>
            <div className="bg-card rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten
                Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO,
                TMG). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten
                Aspekte der Datenverarbeitung im Rahmen unserer Website.
              </p>
            </div>
          </motion.section>

          {/* Verantwortliche Stelle */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              Verantwortliche Stelle
            </h2>
            <div className="bg-card rounded-lg p-6 space-y-4">
              <p>
                <strong>Verantwortlich für die Datenverarbeitung:</strong>
                <br />
                Westfälische Wilhelms-Universität Münster
                <br />
                Schlossplatz 2
                <br />
                48149 Münster
              </p>
              <p>
                <strong>Datenschutzbeauftragter:</strong>
                <br />
                Nina Mustermann
                <br />
                E-Mail:{' '}
                <a
                  href="mailto:datenschutz@uni-muenster.de"
                  className="text-primary hover:underline"
                >
                  datenschutz@uni-muenster.de
                </a>
              </p>
            </div>
          </motion.section>

          {/* Datenerfassung */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" />
              Datenerfassung
            </h2>
            <div className="bg-card rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Automatisch erfasste Daten
                </h3>
                <p className="text-muted-foreground">
                  Beim Besuch unserer Website werden automatisch Daten erfasst, die Ihr Browser an
                  unseren Server übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground">
                  <li>IP-Adresse</li>
                  <li>Datum und Uhrzeit der Anfrage</li>
                  <li>Browsertyp und Version</li>
                  <li>Betriebssystem</li>
                  <li>Referrer URL</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-primary" />
                  Cookies
                </h3>
                <p className="text-muted-foreground">
                  Unsere Website verwendet Cookies. Diese sind kleine Textdateien, die Ihr Browser
                  automatisch erstellt und auf Ihrem Endgerät speichert. Cookies richten auf Ihrem
                  Endgerät keinen Schaden an und enthalten keine Viren. Sie dienen dazu, unser
                  Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Ihre Rechte */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Ihre Rechte
            </h2>
            <div className="bg-card rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">Sie haben jederzeit das Recht:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Auskunft über Ihre gespeicherten Daten zu erhalten</li>
                <li>Die Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
                <li>Die Löschung Ihrer Daten zu verlangen</li>
                <li>Die Einschränkung der Verarbeitung Ihrer Daten zu verlangen</li>
                <li>Der Verarbeitung Ihrer Daten zu widersprechen</li>
                <li>Die Übertragung Ihrer Daten an einen anderen Verantwortlichen zu verlangen</li>
              </ul>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </Container>
  );
}
