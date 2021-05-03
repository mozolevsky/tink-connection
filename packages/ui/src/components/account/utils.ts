import type { Result, CategoryType } from '../../models/transaction'
import type { Expenses } from '../../models/common'

export const extractTransactionData = <T extends Record<string, any>>(
    results: Result[],
    type: CategoryType,
    exceptions: string[] = []
) => {
    return results.reduce((expenses, currentExpense) => {
        const {
            transaction: { categoryType, description, originalAmount, currencyDenominatedAmount }
        } = currentExpense

        return categoryType === type && !exceptions.includes(description)
            ? {
                  ...expenses,
                  [description]: {
                      sum: Math.abs(Math.round(originalAmount)),
                      currency: currencyDenominatedAmount.currencyCode
                  }
              }
            : expenses
    }, {} as T)
}

export const sumTransactions = <T extends Record<string, any>>(
    allTransactions: T
) => (newExpenses: T): T => {
    Object.keys(newExpenses).forEach((company: keyof T) => {
        allTransactions[company] = allTransactions[company]
            ? {
                  ...allTransactions[company],
                  sum: allTransactions[company].sum + newExpenses[company].sum
              }
            : newExpenses[company]
    })

    return allTransactions
}

export const findBiggestExpense = (expenses: Expenses) => {
    let biggestExpense
    let maxSum = 0

    Object.keys(expenses).forEach(companyName => {
        if (expenses[companyName].sum > maxSum) {
            maxSum = expenses[companyName].sum
            biggestExpense = {
                [companyName]: expenses[companyName]
            }
        }
    })

    return biggestExpense
}
