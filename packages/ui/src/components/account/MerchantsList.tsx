import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { AccountBalanceWalletRounded } from '@material-ui/icons'
import type { Expenses } from '../../models/common'

export type MerchantListProps = {
    expenses: Expenses
    onSelect?: (companyName: string) => void
}

export const MerchantsList: React.FC<MerchantListProps> = ({
    expenses,
    onSelect = () => {}
}) => {
    return (
        <section>
            <List component="nav" aria-label="secondary">
                {Object.keys(expenses).map((companyName) => (
                    <ListItem
                        button
                        key={companyName}
                        onClick={() => {
                            onSelect(companyName)
                        }}
                    >
                        <ListItemIcon>
                            <AccountBalanceWalletRounded />
                        </ListItemIcon>
                        <ListItemText
                            primary={companyName}
                            secondary={`${expenses[companyName].sum} ${expenses[companyName].currency}`}
                        />
                    </ListItem>
                ))}
            </List>
        </section>
    )
}

// AccountBalanceWalletRounded
