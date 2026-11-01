import { useState, useEffect } from "react"
import Summary from "./components/Summary"
import TransactionForm from "./components/TransactionForm"
import TransactionList from "./components/TransactionList"
import CategoryBreakdown from "./components/Categorybreakdown"
import "./App.css"

const STORAGE_KEY = 'finance-dahsboard-transactions'

const starterTransactions = [
  { id: 1, description: 'October salary', amount: 2400, type: 'income', category: 'Salary', date: '2026-10-01' },
  { id: 2, description: 'Rent', amount: 750, type: 'expense', category: 'Rent', date: '2026-10-02' },
  { id: 3, description: 'Groceries', amount: 86.4, type: 'expense', category: 'Food', date: '2026-10-05' },
  { id: 4, description: 'Logo for a friend', amount: 150, type: 'income', category: 'FreeLance', date: '2026-10-12' },
  { id: 5, description: 'Metro card top-up', amount: 30, type: 'expense', category: 'Transport', date: '2026-10-05' },
  { id: 6, description: 'Cinema', amount: 18, type: 'expense', category: 'Fun', date: '2026-10-20' },
]

function loadTransactions() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : starterTransactions
}

function App() {
  const [transactions, setTransactions] = useState(loadTransactions)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  function addTransactions(newTransactions) {
    setTransactions([newTransactions, ...transactions])
  }

  function deleteTransactions(id) {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  // 💰 Gəlirlərin hesablanması:
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  // 💸 Xərclərin hesablanması (💡 Bura əlavə edildi):
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>My money</h1>
      </header>
      <Summary income={totalIncome} expenses={totalExpenses} />

      <div className="columns">
        <div className="column">
          <TransactionForm onAdd={addTransactions} />
          <CategoryBreakdown transactions={transactions} />
        </div>
        <TransactionList transactions={transactions} onDelete={deleteTransactions} />
      </div>
    </div>
  )
}

export default App
