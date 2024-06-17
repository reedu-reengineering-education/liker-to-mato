"use client";
import { useRef, useEffect, useState } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";
import { getGroupedAnswers } from "@/lib/api/answerClient";

interface BarChartProps {
  questionId: string;
}

interface GroupedAnswer {
  value: number;
  _count: {
    value: number;
  };
}

function generateColors(numColors: number): string[] {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors;
    colors.push(`hsla(${hue}, 70%, 50%, 0.5)`);
  }
  return colors;
}

export default function BarChart({ questionId }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [groupedAnswers, setGroupedAnswers] = useState<GroupedAnswer[]>([]);

  useEffect(() => {
    async function fetchGroupedAnswers() {
      try {
        const data = await getGroupedAnswers(questionId);
        setGroupedAnswers(data);
      } catch (error) {
        console.error("Error fetching grouped answers:", error);
      }
    }
    fetchGroupedAnswers();
  }, [questionId]);

  useEffect(() => {
    if (chartRef.current && groupedAnswers.length > 0) {
      const context = chartRef.current.getContext("2d");
      if (context) {
        if (chartInstance) {
          chartInstance.destroy();
        }

        const labels = groupedAnswers.map((answer) => answer.value.toString());
        const data = groupedAnswers.map((answer) => answer._count.value);

        const backgroundColors = generateColors(labels.length);
        const borderColors = backgroundColors.map((color) =>
          color.replace("0.5)", "1)")
        );

        const config: ChartConfiguration<"bar", number[], unknown> = {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Frage",
                data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
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
  }, [groupedAnswers]);

  return <canvas ref={chartRef} className="w-full h-full"></canvas>;
}
