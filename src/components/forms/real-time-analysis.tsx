"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type AnalysisData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
};

type RealTimeAnalysisProps = {
  surveyId: string;
};

export function RealTimeAnalysis({ surveyId }: RealTimeAnalysisProps) {
  const [data, setData] = useState<AnalysisData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hier würden Sie normalerweise Ihre API aufrufen
        // Für dieses Beispiel verwenden wir Mock-Daten
        const response = await fetch(`/api/analysis/${surveyId}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fehler beim Laden der Analysedaten:", error);
        toast({
          title: "Fehler",
          description: "Die Analysedaten konnten nicht geladen werden.",
          variant: "destructive",
        });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Aktualisiere alle 5 Sekunden

    return () => clearInterval(interval);
  }, [surveyId, toast]);

  if (!data) {
    return <div>Lade Daten...</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Echtzeit-Umfrageergebnisse",
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Echtzeit-Analyse</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  );
}

export default RealTimeAnalysis;
