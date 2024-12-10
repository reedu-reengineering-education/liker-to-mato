'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SimpleBarChartProps {
  data: Array<{ type: string; count: number }>;
  className?: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, className }) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="type" />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" radius={8}>
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
