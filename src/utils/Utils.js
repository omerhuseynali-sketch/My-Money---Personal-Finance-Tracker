const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export function formatMoney(amount) {
    return formatter.format(amount)
}

export function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00')
    return date.toLocaleDateString('en-US',{month: 'short',day: 'numeric'})
}

export const EXPENSE_CATEGORIES = [
    'Food',
    'Rent',
    'Transport',
    'Bills',
    'Fun',
    'Other',
]

export const INCOME_CATEGORIES = [
    'Salary',
    'Freelance',
    'Gift',
    'Other',
]