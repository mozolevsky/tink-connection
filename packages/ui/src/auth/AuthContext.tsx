import React from 'react'
import { useProvideAuth } from './hooks/useProvideAuth'

type AuthContextType = ReturnType<typeof useProvideAuth>

export const AuthContext: React.Context<AuthContextType> = React.createContext(
    (null as unknown) as AuthContextType
)
