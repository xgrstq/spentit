import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

function TransactionChart({ labels, incomeData, expenseData }) {
  return (
    <div style={{ width: "100%", height: "250px" }}>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              backgroundColor: "rgba(16, 185, 129, 0.7)",
            },
            {
              label: "Expense",
              data: expenseData,
              backgroundColor: "rgba(239, 68, 68, 0.7)",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#aaa",
              },
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