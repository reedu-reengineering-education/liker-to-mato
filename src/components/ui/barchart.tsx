'use client';

import { useEffect, useState } from 'react';
import { getGroupedAnswers } from '@/lib/api/answerClient';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChartComponent,
  LineChartComponent,
  DonutChartComponent,
  AreaChartComponent,
  ScatterChartComponent,
} from '@/components/charts/chart-types';
import { BarChart, LineChart, PieChart, Activity, Circle } from 'lucide-react';

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

const COLORS = [
  '#2563eb', // blue-600
  '#3b82f6', // blue-500
  '#60a5fa', // blue-400
  '#93c5fd', // blue-300
  '#bfdbfe', // blue-200
];

type ChartType = 'bar' | 'line' | 'donut' | 'area' | 'scatter';

const chartComponents = {
  bar: BarChartComponent,
  line: LineChartComponent,
  donut: DonutChartComponent,
  area: AreaChartComponent,
  scatter: ScatterChartComponent,
};

const chartIcons = {
  bar: <BarChart className="h-4 w-4" />,
  line: <LineChart className="h-4 w-4" />,
  donut: <PieChart className="h-4 w-4" />,
  area: <Activity className="h-4 w-4" />,
  scatter: <Circle className="h-4 w-4" />,
};

const chartLabels = {
  bar: 'Balkendiagramm',
  line: 'Liniendiagramm',
  donut: 'Donutdiagramm',
  area: 'Flächendiagramm',
  scatter: 'Streudiagramm',
};

const CustomBarChart: React.FC<BarChartProps> = ({ questionId, questionName, min, max }) => {
  const [groupedAnswers, setGroupedAnswers] = useState<GroupedAnswer[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const { toast } = useToast();

  useEffect(() => {
    async function fetchGroupedAnswers() {
      try {
        setIsLoading(true);
        const data = await getGroupedAnswers(questionId);
        console.log('Fetched grouped answers:', data);
        setGroupedAnswers(data);
      } catch (error) {
        console.error('Error fetching grouped answers:', error);
        toast({
          title: 'Fehler',
          description: 'Die Antworten konnten nicht geladen werden.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchGroupedAnswers();
  }, [questionId, toast]);

  useEffect(() => {
    if (groupedAnswers.length > 0) {
      const data = groupedAnswers.map((answer, index) => ({
        name: index === 0 ? min : index === groupedAnswers.length - 1 ? max : `${answer.value}`,
        value: answer._count.value,
        fill: COLORS[index % COLORS.length],
      }));
      console.log('Transformed chart data:', data);
      setChartData(data);
    }
  }, [groupedAnswers, min, max]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        Keine Daten verfügbar
      </div>
    );
  }

  const ChartComponent = chartComponents[chartType];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wähle einen Diagrammtyp" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(chartComponents) as ChartType[]).map((type) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center gap-2">
                  {chartIcons[type]}
                  {chartLabels[type]}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px]">
        <ChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default CustomBarChart;
