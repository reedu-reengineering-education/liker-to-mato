"use client";
import { useRef, useEffect, useState } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";
import { questionAnswers } from "@/lib/api/answerClient";
import { Answer } from "@prisma/client";

export default function BarChart({ questionId }: { questionId: string }) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    console.log("Fetching answers for questionId:", questionId);
    questionAnswers(questionId)
      .then(setAnswers)
      .catch((error) => console.error(error));
  }, [questionId]);

  useEffect(() => {
    if (chartRef.current && answers.length > 0) {
      const context = chartRef.current.getContext("2d");
      if (context) {
        if (chartInstance) {
          chartInstance.destroy();
        }

        const valueCounts: Record<number, number> = {};
        answers.forEach((answer) => {
          valueCounts[answer.value] = (valueCounts[answer.value] || 0) + 1;
        });

        const labels: string[] = Object.keys(valueCounts)
          .map(Number)
          .map(String);
        const data: number[] = Object.values(valueCounts);

        const config: ChartConfiguration<"bar", number[], unknown> = {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Anzahl der Antworten",
                data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };

        const newChart = new Chart(context, config);
        setChartInstance(newChart);
      }
    }
  }, [answers]);

  return <canvas ref={chartRef}></canvas>;
}
