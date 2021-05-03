export type CategoryType = 'INCOME' | 'EXPENSES' | 'TRANSFERS'

export type Transaction = {
    accountId: string
    amount: number
    categoryId: string
    categoryType: CategoryType
    date: number
    description: string
    originalAmount: number
    currencyDenominatedAmount: {
        currencyCode: string
    }
}

export type Result = {
    type: string,
    score: number
    timestamp: number
    transaction: Transaction
}

export type TransactionsResponse = {
    count: number
    results: Result[]
}
