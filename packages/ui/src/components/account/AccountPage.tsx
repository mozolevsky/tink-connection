import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../../auth/hooks/useAuth'
import { transactionsServices } from '../../services/transactionsServices'
import { MerchantsList } from './MerchantsList'
import { MerchantCard } from './MerchantCard'
import {
    extractTransactionData,
    sumTransactions,
    findBiggestExpense
} from './utils'

import type { Expenses } from '../../models/common'
import type { TransactionsResponse } from '../../models/transaction'

const { loadTransactions } = transactionsServices

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        padding: '1rem 0'
    },
    cardContainer: {
        textAlign: 'center',
        paddingTop: '2rem'
    }
})

export const AccountPage: React.FC = () => {
    const styles = useStyles()
    const { withToken } = useAuth()

    const [offset, changeOffset] = useState(0)
    const [expenses, updateExpenses] = useState<Expenses>({})
    const [biggestExpense, changeBiggestExpense] = useState<Expenses>()
    const [selectedMerchant, changeSelectedMerchant] = useState<Expenses>()

    const { isLoading, refetch } = useQuery(
        'transactions',
        () => withToken<TransactionsResponse>(loadTransactions)('last year', offset),
        {
            enabled: false,
            onSuccess: (data) => {
                const { results } = data

                if (results.length) {
                    updateExpenses(
                        sumTransactions<Expenses>(
                            extractTransactionData<Expenses>(
                                results,
                                'EXPENSES',
                                ['Tuition', 'Rent']
                            )
                        )
                    )
                    changeOffset(offset + 200)
                }
            }
        }
    )

    useEffect(() => {
        refetch().then(() => {
            changeBiggestExpense(findBiggestExpense(expenses))
        })
    }, [offset])

    const handleSelect = (companyName: string) => {
        const selected = expenses[companyName] ? {
            [companyName]: expenses[companyName]
        } : undefined

        changeSelectedMerchant(selected)
    }

    if (isLoading) {
        return <LinearProgress />
    }

    return (
        <section className={styles.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <MerchantsList expenses={expenses} onSelect={handleSelect}/>
                </Grid>
                <Grid item xs={3} className={styles.cardContainer}>
                    {biggestExpense ? (
                         <MerchantCard
                             expense={selectedMerchant || biggestExpense}
                             year="2020"
                        />
                    ): (
                        <CircularProgress />
                    )}
                </Grid>
            </Grid>
        </section>
    )
}
