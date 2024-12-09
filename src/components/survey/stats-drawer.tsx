"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SurveyBarChart } from "@/components/charts/survey-bar-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface StatsDrawerProps {
  surveyId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface QuestionStats {
  id: string;
  name: string;
  averageValue: number;
  responseCount: number;
}

export function StatsDrawer({
  surveyId,
  isOpen,
  onOpenChange,
}: StatsDrawerProps) {
  const [stats, setStats] = useState<QuestionStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      if (!surveyId || !isOpen) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log("Fetching stats for survey:", surveyId);
        const response = await axios.get(`/api/survey/${surveyId}/stats`);
        console.log("Response data:", response.data);

        if (response.data && Array.isArray(response.data)) {
          const formattedStats = response.data.map((stat) => ({
            ...stat,
            averageValue: Number(stat.averageValue.toFixed(2)),
            responseCount: Number(stat.responseCount),
          }));
          console.log("Formatted stats:", formattedStats);
          setStats(formattedStats);
        } else {
          throw new Error("Ungültiges Datenformat");
        }
      } catch (error) {
        console.error("Error fetching survey stats:", error);
        toast({
          title: "Fehler",
          description: "Die Statistiken konnten nicht geladen werden.",
          variant: "destructive",
        });
        setStats([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [surveyId, isOpen, toast]);

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Umfrage-Statistiken</DrawerTitle>
          <DrawerDescription>
            Übersicht über die Antworten und durchschnittlichen Bewertungen
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-6 pt-0">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : stats.length > 0 ? (
            <div className="w-full h-[400px]">
              <SurveyBarChart data={stats} />
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Keine Statistiken verfügbar
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
