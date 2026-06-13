import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

function TransactionChart({ labels, incomeData, expenseData }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "#2d3a34", // Sage Tua solid
        borderRadius: 4, // Sudut tumpul tipis yang elegan
        borderSkipped: false,
        barPercentage: 0.3, // Batang dibuat ramping dan minimalis
        categoryPercentage: 0.7,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "#d9c3b0", // Warna jerami/kayu ringan hangat
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.3,
        categoryPercentage: 0.7,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
      animation: {
       duration: 800,
       easing: "easeOutQuart",
      },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#1a221f",
        bodyColor: "#606f66",
        borderColor: "#e1e6e1",
        borderWidth: 1,
        padding: 12,
      },
      titleFont: {
       size: 12,
       weight: "600",
      },
      bodyFont: {
       size: 11,
      },
       displayColors: false,
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#86958c", font: { size: 11 } },
      },
      y: {
        grid: {
          color: "rgba(134,149,140,0.08)",
          drawBorder: false,
        },
        border: { display: false },
        ticks: {
          color: "#86958c",
          font: { size: 11 },
          callback: value => "Rp " + value.toLocaleString("id-ID", { notation: "compact" }),
        },
      },
    },
  }

  return (
    <div className="w-full h-[280px] md:h-[380px]">
      {labels.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm font-serif italic text-[#86958c]">Belum ada aktivitas keuangan.</p>
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  )
}

export default TransactionChart