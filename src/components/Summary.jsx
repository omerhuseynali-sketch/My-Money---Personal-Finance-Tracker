import { formatMoney } from "../utils/Utils";

function Summary({income,expenses}) {
    
    const balance = income - expenses

    return (
        <section className="summary">
            <div className="balance">
                <span className="label">Balance</span>
                <span className={balance < 0 ? 'balance-amount negative' : 'balance-amount'}>
                    {formatMoney(balance)}
                </span>
            </div>

            <div className="summary-side">
                <div>
                    <span className="label">Income</span>
                    <span className="income">{formatMoney(income)}</span>
                </div>
                <div>
                    <span className="label">Expenses</span>
                    <span className="expense">{formatMoney(expenses)}</span>
                </div>
            </div>
        </section>
    )
}

export default Summary