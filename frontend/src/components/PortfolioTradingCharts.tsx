
import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

type ChartData = {
  labels: string[];
  datasets: Array<any>;
};

export function SectorPieChart({ data }: { data: ChartData }) {
  if (!data || !Array.isArray(data.labels) || !Array.isArray(data.datasets)) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Sector Allocation</h2>
      {/* Only pass data prop, no children */}
      <Pie data={data} />
    </div>
  );
}

export function ReturnsLineChart({ data }: { data: ChartData }) {
  if (!data || !Array.isArray(data.labels) || !Array.isArray(data.datasets)) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Portfolio Returns</h2>
      {/* Only pass data prop, no children */}
      <Line data={data} />
    </div>
  );
}
