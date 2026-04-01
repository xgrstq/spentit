import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

function TransactionChart({ labels, data }) {
  return (
    <div style={{ width: "100%", height: "250px" }}>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Expense",
              data: data,
              backgroundColor: "rgba(239, 68, 68, 0.7)",
              borderRadius: 6,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: { color: "#aaa" },
              grid: { color: "#222" },
            },
            y: {
              ticks: { color: "#aaa" },
              grid: { color: "#222" },
            },
          },
        }}
      />
    </div>
  )
}

export default TransactionChart