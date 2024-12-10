'use client';

import {
  Bar,
  Line,
  Pie,
  Area,
  Scatter,
  ResponsiveContainer,
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

interface ChartProps {
  data: {
    name: string;
    value: number;
    fill?: string;
  }[];
  height?: number;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--muted))',
];

export function BarChartComponent({ data, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        <YAxis tick={{ fill: 'currentColor' }} tickLine={{ stroke: 'currentColor' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Legend />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineChartComponent({ data, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        <YAxis tick={{ fill: 'currentColor' }} tickLine={{ stroke: 'currentColor' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DonutChartComponent({ data, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" label>
          {data.map((entry, index) => (
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
  );
}

export function AreaChartComponent({ data, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        <YAxis tick={{ fill: 'currentColor' }} tickLine={{ stroke: 'currentColor' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ScatterChartComponent({ data, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="category"
          dataKey="name"
          name="Wert"
          tick={{ fill: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        <YAxis
          type="number"
          dataKey="value"
          name="Anzahl"
          tick={{ fill: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Legend />
        <Scatter name="Antworten" data={data} fill="hsl(var(--primary))" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
