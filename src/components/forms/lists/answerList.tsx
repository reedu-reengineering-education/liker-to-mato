"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BarChart, ChevronLeft, ChevronRight } from "lucide-react";
import CustomBarChart from "@/components/ui/barchart";
import { surveyQuestions } from "@/lib/api/surveyClient";
import { Question } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface SurveyChartsDrawerProps {
  surveyId: string;
}

export default function SurveyChartsDrawer({
  surveyId,
}: SurveyChartsDrawerProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await surveyQuestions(surveyId);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Fehler beim Laden der Fragen:", error);
        toast({
          title: "Fehler",
          description:
            "Die Fragen konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [surveyId, toast]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const renderChartCarousel = () => (
    <div className="relative">
      <Carousel 
        opts={{ align: "start" }} 
        className="w-full max-w-6xl mx-auto"
        setApi={setApi}
      >
        <CarouselContent>
          {questions.map((question) => (
            <CarouselItem key={question.id} className="pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-center text-foreground/90">
                  {question.name}
                </h3>
                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <CustomBarChart
                    questionId={question.id}
                    questionName={question.name}
                    min={question.min}
                    max={question.max}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 lg:-left-12">
          <ChevronLeft className="h-4 w-4" />
        </CarouselPrevious>
        <CarouselNext className="right-2 lg:-right-12">
          <ChevronRight className="h-4 w-4" />
        </CarouselNext>
      </Carousel>
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Frage {currentSlide + 1} von {questions.length}</span>
          <span>{Math.round(((currentSlide + 1) / questions.length) * 100)}%</span>
        </div>
        <Progress value={((currentSlide + 1) / questions.length) * 100} className="h-1" />
      </div>
    </div>
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2">
          <BarChart className="h-4 w-4" />
          Diagramme
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader>
            <DrawerTitle>Umfrage-Auswertung</DrawerTitle>
            <DrawerDescription>
              Visualisierung der Umfrageantworten mit verschiedenen Diagrammtypen
            </DrawerDescription>
          </DrawerHeader>
          
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Lade Diagramme...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-muted-foreground">
              Keine Fragen gefunden
            </div>
          ) : (
            <div className="px-4">
              {renderChartCarousel()}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
