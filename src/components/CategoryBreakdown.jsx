import { formatMoney } from '../utils/Utils.js'

// Shows where the money goes.No chart library

function CategoryBreakdown({ transactions }){
    const expenses = transactions.filter((t) => t.type === 'expense')

    const totals = {}
    for (const t of expenses) {
        totals[t.category] = (totals[t.category] || 0) + t.amount
    }

    const rows = Object.entries(totals).sort((a, b) => b[1] - a[1])
    
    const biggest = rows.length > 0 ? rows[0][1] : 0

    return (
        <section className='panel'>
            <h2>Spending by category</h2>

            {rows.length === 0 ? (
                <p className="empty">No expenses yet.</p>
            ) : (
                    <ul className="breakdown">
                        {rows.map(([category, total]) => (
                            <li key={category}>
                                <div className="breakdown-text">
                                    <span>{category}</span>
                                    <span className="muted">{formatMoney(total)}</span>
                                </div>
                                <div className="bar-track">
                                    <div className="bar-fill"
                                        style={{ width: `${(total / biggest) * 100}%` }}/>
                                </div>
                            </li>
                        ))}
                    </ul>
            ) }
        </section>
    )
}

export default CategoryBreakdown