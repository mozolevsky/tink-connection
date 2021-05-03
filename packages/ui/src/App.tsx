import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'
import Container from '@material-ui/core/Container'
import { AuthProvider } from './auth/AuthProvider'
import { PrivateRoute } from './auth/components/PrivateRoute'
import { LoginPage } from './components/login/LoginPage'
import { AccountPage } from './components/account/AccountPage'
import { AuthRedirect } from './auth/components/AuthRedirect'

const queryClient = new QueryClient()

const App = () => {
    return (
        <Container>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Router>
                        <Switch>
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <Route path="/callback">
                                <AuthRedirect
                                    loggedOutUrl="/login"
                                    loggedInUrl="/"
                                />
                            </Route>
                            <PrivateRoute path="/" exact>
                                <AccountPage />
                            </PrivateRoute>
                        </Switch>
                    </Router>
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Container>
    )
}

export default App
