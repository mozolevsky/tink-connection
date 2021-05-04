import type {TransactionsResponse} from '../models/transaction'
export interface ITransactionsServicesImpl {
    loadTransactions: (access_token: string, query_string: string, offset: number) => Promise<TransactionsResponse>
}

export class TransactionsServicesImpl implements ITransactionsServicesImpl {
    loadTransactions = async (access_token: string, query_string: string, offset: number): Promise<TransactionsResponse> => {
        const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/search`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sort": "DATE",
                "queryString": query_string,
                "offset": offset
            })
        })

        return await res.json()
    }
}

export const transactionsServices = new TransactionsServicesImpl()
