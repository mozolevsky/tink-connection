import React, { useState } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const [isAccessTokenLoaded, updateTokenLoadStatus] = useState(false)
    const { isAccessValid, doesRefreshTokenExist, renewToken } = useAuth()

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (isAccessValid()) {
                    return children
                }

                if (doesRefreshTokenExist() && !isAccessTokenLoaded) {
                    renewToken().then(() => {
                        updateTokenLoadStatus(true)
                    })
                    return <LinearProgress />
                }

                return (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }}
        />
    )
}
