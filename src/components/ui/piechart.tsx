"use client";

import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
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

interface PieChartProps {
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

const CustomPieChart: React.FC<PieChartProps> = ({
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
      const colorsConfig = generateColors(groupedAnswers.length);
      setChartConfig(colorsConfig);

      const data = groupedAnswers.map((answer, index) => ({
        name: answer.value.toString(),
        value: answer._count.value,
        fill: colorsConfig[`color${index + 1}`].color,
      }));
      setChartData(data);
    }
  }, [groupedAnswers]);

  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{questionName}</CardTitle>
        <CardDescription>Data visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className=" w-full h-[53vh] mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              {/* <Tooltip content={<ChartTooltipContent hideLabel />} /> */}
              <Pie data={chartData} dataKey="value" nameKey="name" label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
};

export default CustomPieChart;
