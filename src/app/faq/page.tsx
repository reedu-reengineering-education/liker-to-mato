"use client";

import { Container } from "@/components/ui/layout/Container";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

// FAQ-Daten
const faqs = [
  {
    category: "Allgemein",
    items: [
      {
        question: "Was ist Likert-O-Mat?",
        answer:
          "Likert-O-Mat ist eine moderne Plattform für wissenschaftliche Umfragen, die speziell für akademische Forschung entwickelt wurde. Sie ermöglicht es Forschern, professionelle Likert-Skala-basierte Umfragen zu erstellen und durchzuführen.",
      },
      {
        question: "Für wen ist Likert-O-Mat geeignet?",
        answer:
          "Likert-O-Mat ist ideal für Wissenschaftler, Doktoranden, Professoren und Studenten, die quantitative Forschung betreiben und dabei auf ein professionelles Umfragetool angewiesen sind.",
      },
      {
        question: "Ist Likert-O-Mat kostenlos?",
        answer:
          "Ja, Likert-O-Mat ist für akademische Zwecke kostenlos nutzbar. Wir glauben an den freien Zugang zu Forschungswerkzeugen für die wissenschaftliche Gemeinschaft.",
      },
    ],
  },
  {
    category: "Funktionen",
    items: [
      {
        question: "Welche Arten von Fragen kann ich erstellen?",
        answer:
          "Sie können verschiedene Arten von Likert-Skala-Fragen erstellen, von klassischen 5-Punkt-Skalen bis hin zu erweiterten 7-Punkt-Skalen. Zusätzlich können Sie Freitextfragen und demographische Fragen einbauen.",
      },
      {
        question: "Wie kann ich meine Ergebnisse exportieren?",
        answer:
          "Ihre Umfrageergebnisse können Sie einfach im CSV- oder Excel-Format exportieren. Die Daten sind so aufbereitet, dass sie direkt in Statistiksoftware wie SPSS oder R importiert werden können.",
      },
      {
        question: "Gibt es eine Begrenzung der Teilnehmerzahl?",
        answer:
          "Nein, es gibt keine Begrenzung der Teilnehmerzahl. Sie können so viele Teilnehmer einladen, wie Sie möchten.",
      },
    ],
  },
  {
    category: "Datenschutz & Sicherheit",
    items: [
      {
        question: "Wie werden meine Daten geschützt?",
        answer:
          "Wir nehmen Datenschutz sehr ernst. Alle Daten werden verschlüsselt gespeichert und auf deutschen Servern gehostet, die der DSGVO entsprechen.",
      },
      {
        question: "Kann ich Umfragen anonym durchführen?",
        answer:
          "Ja, Sie können Ihre Umfragen vollständig anonym durchführen. Die Teilnehmer müssen sich nicht registrieren und ihre IP-Adressen werden nicht gespeichert.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filterfunktion für die Suche
  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0);

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
            Häufig gestellte Fragen
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finden Sie Antworten auf die häufigsten Fragen zu Likert-O-Mat.
            Falls Sie weitere Fragen haben, kontaktieren Sie uns gerne.
          </p>
        </div>

        {/* Suchfeld */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Durchsuchen Sie die FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.map((category, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`${index}-${itemIndex}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-muted-foreground">
                Keine Ergebnisse für &quot;{searchQuery}&quot; gefunden.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Container>
  );
}
