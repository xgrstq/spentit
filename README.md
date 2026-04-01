# 💸 Spentit

Spentit is a simple financial tracking web app built for managing income and expenses.
Designed for real-world use — especially for small business workflows like buying/selling and maintenance tracking.

## .🚀 Features

* 🔐 Authentication (Email + Google OAuth via Supabase)
* 💰 Add income & expense transactions
* 📝 Notes for each transaction (e.g. maintenance details)
* ✏️ Edit & 🗑️ Delete transactions
* 📊 Financial summary (Income, Expense, Balance)
* 📈 Chart visualization (Expense per day)
* ⚡ Auto update without refresh
* 🌙 Dark UI with TailwindCSS 

## 🧠 Use Case

Perfect for:

* Personal finance tracking
* Small business (e.g. motorcycle trading)
* Monitoring maintenance costs
* Daily cash flow tracking

## 🧱 Tech Stack

* ⚛️ React (Vite)
* 🎨 Tailwind CSS v4
* 🔥 Supabase (Auth & Database)
* 🚀 Chart.js (Data visualization)

## 📂 Project Structure

src/

* components/
  * ui/
    * transaction/
* hooks/
* lib/
* pages/

## ⚙️ Setup

* 1.Clone repo
  
* 2.Install dependencies
npm install

* 3.Setup .env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

* 4.Run project
npm run dev

## 📊 Future Improvements

* 🏷️ Transaction categories
* 📅 Monthly filtering
* 📈 Advanced analytics (profit tracking)

## 🧠 Author

Built with chaos and milk by ngodinginaja

---

> “Track your money before it disappears.” 💀
