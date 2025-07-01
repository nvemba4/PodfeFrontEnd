"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js"
import { Line, Bar, Doughnut } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
)

interface ChartProps {
  data: any
  options?: any
  type?: "line" | "bar" | "doughnut"
}

export function Chart({ data, options, type = "line" }: ChartProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  }

  const chartOptions = { ...defaultOptions, ...options }

  switch (type) {
    case "bar":
      return <Bar data={data} options={chartOptions} />
    case "doughnut":
      return <Doughnut data={data} options={chartOptions} />
    default:
      return <Line data={data} options={chartOptions} />
  }
} 