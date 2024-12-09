"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface SurveyBarChartProps {
  data: {
    id: string;
    name: string;
    averageValue: number;
    responseCount: number;
  }[];
}

export function SurveyBarChart({ data }: SurveyBarChartProps) {
  console.log("Rendering SurveyBarChart with data:", data);

  const chartData = data.map((item) => ({
    name: item.name,
    "Durchschnittliche Bewertung": Number(item.averageValue),
    "Anzahl Antworten": item.responseCount,
  }));

  console.log("Transformed chart data:", chartData);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Umfrage-Statistiken</CardTitle>
        <CardDescription>
          Durchschnittliche Bewertungen und Anzahl der Antworten pro Frage
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-130px)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="Durchschnittliche Bewertung"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar
              dataKey="Anzahl Antworten"
              fill="hsl(var(--secondary))"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
