"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SurveyTemplate } from "@/types/templates";
import { Search, Tag, Clock, Users } from "lucide-react";

// Beispiel-Vorlagen
const defaultTemplates: SurveyTemplate[] = [
  {
    id: "1",
    name: "Mitarbeiter-Feedback",
    description: "Standardvorlage für regelmäßiges Mitarbeiter-Feedback",
    category: "Feedback",
    icon: "users",
    questions: [
      {
        id: "q1",
        type: "likert",
        text: "Wie zufrieden sind Sie mit Ihrer aktuellen Arbeitsumgebung?",
        required: true,
        scale: 5,
      },
      {
        id: "q2",
        type: "text",
        text: "Was könnte verbessert werden?",
        required: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Kundenzufriedenheit",
    description: "Umfrage zur Messung der Kundenzufriedenheit",
    category: "Zufriedenheit",
    icon: "smile",
    questions: [
      {
        id: "q1",
        type: "likert",
        text: "Wie wahrscheinlich ist es, dass Sie unser Produkt weiterempfehlen würden?",
        required: true,
        scale: 10,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Kurs-Evaluation",
    description: "Vorlage für die Evaluation von Kursen und Workshops",
    category: "Evaluation",
    icon: "book",
    questions: [
      {
        id: "q1",
        type: "likert",
        text: "Der Kursinhalt war gut strukturiert",
        required: true,
        scale: 5,
      },
      {
        id: "q2",
        type: "multiple",
        text: "Welche Themen fanden Sie besonders interessant?",
        required: true,
        options: ["Theorie", "Praxis", "Diskussionen", "Übungen"],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface TemplatePreviewProps {
  template: SurveyTemplate;
  onClose: () => void;
  onUse: (template: SurveyTemplate) => void;
}

function TemplatePreview({ template, onClose, onUse }: TemplatePreviewProps) {
  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>{template.name}</DialogTitle>
        <DialogDescription>{template.description}</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <h4 className="font-medium">Enthaltene Fragen:</h4>
          <div className="space-y-2">
            {template.questions.map((question, index) => (
              <div key={question.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Frage {index + 1}</span>
                  <Badge variant="secondary">{question.type}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {question.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {template.questions.length} Fragen
          </div>
          <div className="flex items-center">
            <Tag className="mr-1 h-4 w-4" />
            {template.category}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Abbrechen
        </Button>
        <Button onClick={() => onUse(template)}>Diese Vorlage verwenden</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export function TemplateList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] =
    useState<SurveyTemplate | null>(null);

  const filteredTemplates = defaultTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUseTemplate = (template: SurveyTemplate) => {
    // Hier implementieren wir später die Logik zum Erstellen einer neuen Umfrage aus der Vorlage
    console.log("Using template:", template);
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Vorlagen durchsuchen..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Dialog key={template.id}>
            <Card>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {template.category}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {template.questions.length} Fragen
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    Vorschau & Verwenden
                  </Button>
                </DialogTrigger>
              </CardFooter>
            </Card>
            {selectedTemplate && (
              <TemplatePreview
                template={selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
                onUse={handleUseTemplate}
              />
            )}
          </Dialog>
        ))}
      </div>
    </div>
  );
}
