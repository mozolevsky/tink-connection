import React, { useState } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const [value, update] = useState(false)
    const { isAccessValid, isRefreshTokenExists, renewToken } = useAuth()

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (isAccessValid()) {
                    return children
                }

                if (isRefreshTokenExists()) {
                    renewToken().then(() => {
                        update(!value)
                    })
                    return (
                        <p>.... renew token</p>
                    )
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
