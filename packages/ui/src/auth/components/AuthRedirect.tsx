import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQueryURLParams } from '../hooks/useQueryURLParams'
import { useAuth } from '../hooks/useAuth'

export type AuthRedirectType = {
    loggedInUrl: string
    loggedOutUrl: string
}

const CODE = 'code'

export const AuthRedirect: React.FC<AuthRedirectType> = ({loggedInUrl, loggedOutUrl}) => {
    const [isTokenReady, changeTokenAvailability] = useState(false)
    const auth = useAuth()
    const params = useQueryURLParams()

    useEffect(() => {
        const code = params.get(CODE)

        if (code)
            auth.logIn(code).finally(() => {
                changeTokenAvailability(true)
            })
    }, [])

    if (!isTokenReady) {
        return <CircularProgress size={30} thickness={5} />
    }

    return auth.isAccessValid() ? <Redirect to={loggedInUrl} /> : <Redirect to={loggedOutUrl} />
}
