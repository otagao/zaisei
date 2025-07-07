import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  income: number;
  expense: number;
}

export default function BarChart({ income, expense }: BarChartProps) {
  const data = {
    labels: ['収入', '支出'],
    datasets: [
      {
        label: '金額 (¥)',
        data: [income, expense],
        backgroundColor: [
          '#04844b', // 収入の色（緑）
          '#c71f37', // 支出の色（赤）
        ],
        borderColor: [
          '#04844b',
          '#c71f37',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '収入 vs 支出',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `¥${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return `¥${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
}