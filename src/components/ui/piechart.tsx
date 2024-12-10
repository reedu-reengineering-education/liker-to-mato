'use client';

import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { getGroupedAnswers } from '@/lib/api/answerClient';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

const COLORS = [
  '#2563eb', // blue-600
  '#3b82f6', // blue-500
  '#60a5fa', // blue-400
  '#93c5fd', // blue-300
  '#bfdbfe', // blue-200
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChart: React.FC<PieChartProps> = ({ questionId, questionName, min, max }) => {
  const [groupedAnswers, setGroupedAnswers] = useState<GroupedAnswer[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchGroupedAnswers() {
      try {
        setIsLoading(true);
        const data = await getGroupedAnswers(questionId);
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
      }));
      setChartData(data);
    }
  }, [groupedAnswers, min, max]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-muted-foreground">
        Keine Daten verfügbar
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{questionName}</CardTitle>
        <CardDescription>Verteilung der Antworten</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[53vh] mx-auto aspect-square pb-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="80%"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomPieChart;
