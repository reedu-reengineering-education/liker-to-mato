"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getGroupedAnswers } from "@/lib/api/answerClient";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartProps {
  questionId: string;
  questionName: string;
  min: string;
  max: string;
}

interface GroupedAnswer {
  value: number;
  _count: {
    value: number;
  };
}

interface DynamicChartConfig extends ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

function generateColors(numColors: number): DynamicChartConfig {
  const colors: DynamicChartConfig = {};
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors;
    colors[`color${i + 1}`] = {
      label: `Color ${i + 1}`,
      color: `hsla(${hue}, 70%, 50%, 0.5)`,
    };
  }
  return colors;
}

const CustomBarChart: React.FC<BarChartProps> = ({
  questionId,
  questionName,
  min,
  max,
}) => {
  const [groupedAnswers, setGroupedAnswers] = useState<GroupedAnswer[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState<DynamicChartConfig>({});

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
    if (groupedAnswers.length > 0) {
      const minValue = parseInt(min, 10);
      const maxValue = parseInt(max, 10);
      const colorsConfig = generateColors(maxValue - minValue + 1);
      setChartConfig(colorsConfig);

      const data = [];
      for (let i = minValue; i <= maxValue; i++) {
        const answer = groupedAnswers.find((ans) => ans.value === i);
        data.push({
          name: i.toString(),
          value: answer ? answer._count.value : 0,
          fill: colorsConfig[`color${i - minValue + 1}`].color,
        });
      }
      setChartData(data);
    }
  }, [groupedAnswers, min, max]);

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>{questionName}</CardTitle>
        <CardDescription>Data visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[55vh] ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" radius={8}>
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
};

export default CustomBarChart;
