import { useState } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/Utils'

function TransactionForm({onAdd}) {
    
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState('Food')
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [error, setError] = useState('')
    
    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

    function handleTypeChanges(e) {
        const newType = e.target.value
        setType(newType)
        setCategory(newType === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0])
    }

    function handleSubmit(e) {
        e.preventDefault()

        const amountNumber = Number(amount)

        if (description.trim() === '') {
            setError('Add a short description.')
            return
        }
        if (!amountNumber || amountNumber <= 0) {
            setError('Amount has to be more than 0.')
            return 
        }
        onAdd({
            id: Date.now(),
            description: description.trim(),
            amount: amountNumber,
            type,
            category,
            date,
        })
        setDescription('')
        setAmount('')
        setError('')
    }

    return (
        <form className='panel form' onSubmit={handleSubmit}>
            <h2>Add transactions</h2>

            <label>
                Description
                <input
                    type="text"
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Coffee with partner"/>
            </label>

            <div className='row'>
                <label>
                    Amount
                    <input 
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </label>

                <label>
                    Type
                    <select value={type} onChange={handleTypeChanges}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </label>
            </div>

            <div className='row'>
                <label>
                    Category
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Date
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit">Add</button>
        </form>
    )
}

export default TransactionForm