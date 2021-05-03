import React, {useRef, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Logo } from './Logo'

import type { Expenses } from '../../models/common'

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 14
    }
})

export type MerchantCardProps = {
    expense: Expenses
    year: string
    title?: string
    descTemplate?: (year: string, sum: number, currency: string, companyName: string) => string
}

const getFirstKey = (object: Record<string, any>) => Object.keys(object)[0]

export const MerchantCard: React.FC<MerchantCardProps> = ({
    expense,
    year,
    descTemplate = (year, sum, currency, companyName) =>
        `During ${year} you've spent ${sum} ${currency} ${companyName}`
}) => {
    const styles = useStyles()
    const companyName = getFirstKey(expense)
    const {currency, sum} = expense[companyName]
    const biggest = useRef('')

    useEffect(() => {
        biggest.current = companyName
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Card className={styles.root}>
            <CardContent className={styles.content}>
                <Typography
                    className={styles.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {`Your ${biggest.current === companyName ? 'FAVORITE' : ''} merchant:`}
                </Typography>

                <Logo companyName={companyName} />

                <Typography variant="h5" component="p">
                    <b>{`${sum} ${currency}`}</b>
                </Typography>

                <Typography variant="caption" component="p" align='center'>
                    {descTemplate(year, sum, currency, companyName)}
                </Typography>
            </CardContent>
        </Card>
    )
}
