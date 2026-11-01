import { useState } from 'react'
import { formatMoney, formatDate } from '../utils/Utils'

function TransactionList({ transactions, onDelete }) {
    const [filter, setFilter] = useState('all')
    
    const visible = transactions
    .filter((t) => filter === 'all' || t.type === filter)
    .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
    
    return (
        <section className='panel'>
            <div className="list-header">
                <h2>transactions</h2>
                <div className="filters">
                    {['all', 'income', 'expense'].map((f) => (
                        <button key={f} type="button" className={filter === f ? 'filter active' : 'filter'}
                            onClick={() => setFilter(f)}
                        >{f}
                        </button>
                    ))}
                </div>
            </div>

            {visible.length === 0 ? (
                <p className="empty">Nothing here yet. Add a transaction to get started.</p>
            ) : (
                    <ul className="transactions">
                        {visible.map((t) => (
                            <li key={t.id}>
                                <div className="transaction-info">
                                    <strong>{t.description}</strong>
                                    <span className="muted">
                                        {t.category} . {formatDate(t.date)}
                                    </span>
                                </div>

                                <span className={t.type === 'income' ? 'income' : 'expense'}>
                                    {t.type === 'income' ? '+' : '-'}{formatMoney(t.amount)}
                                </span>

                                <button
                                    type="button"
                                    className="delete"
                                    onClick={() => onDelete(t.id)}
                                    aria-label={`Delete ${t.description}`}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
            )}
        </section>
    )
}

export default TransactionList