import React from 'react'
import { AuthContext } from './AuthContext'
import { useProvideAuth } from './hooks/useProvideAuth'

export const AuthProvider: React.FC = ({ children }) => {
    const auth = useProvideAuth()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
