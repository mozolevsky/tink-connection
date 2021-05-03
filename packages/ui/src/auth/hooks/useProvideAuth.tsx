import Cookies from 'js-cookie'
import { authServices } from '../../services/authServices'

type Credentials = {
    access_token: string
    expires_in: number
    refresh_token: string
}

let inMemoryToken: string | null = null

const handleSuccess = ({
    access_token,
    expires_in,
    refresh_token
}: Credentials) => {
    
    if (refresh_token) {
        Cookies.set('refresh_token', refresh_token, {
            secure: true,
            sameSite: 'strict'
        })
    }

    if (expires_in) {
        Cookies.set('expired', new Date(Date.now() + (expires_in / 3600) * 60000))
    }

    if (access_token) inMemoryToken = access_token
}

const handleError = (e: Error) => {
    Cookies.remove('refresh_token')
    Cookies.remove('expires_in')
    inMemoryToken = null

    console.error(e)
}

export const useProvideAuth = () => {
    const logIn = (code: string) =>
        authServices.logIn(code).then(handleSuccess).catch(handleError)

    const renewToken = () => {
        const refreshToken = Cookies.get('refresh_token')

        if (!refreshToken || refreshToken === 'undefined') throw new Error('there is no refreshToken')

        return authServices
            .renewToken(refreshToken)
            .then(handleSuccess)
            .catch(handleError)
    }

    const isAccessValid = () => {
        const expirationDate = Cookies.get('expired')

        return (
            inMemoryToken &&
            expirationDate &&
            new Date(expirationDate) > new Date(Date.now())
        )
    }

    const isRefreshTokenExists = () => {
        const refreshToken =  Cookies.get('refresh_token')

        return refreshToken
    }

    const withToken = <T extends unknown>(service: (...args: any[]) => Promise<T>) => {
        return service.bind(null, inMemoryToken)
    }

    return {
        logIn,
        renewToken,
        isAccessValid,
        isRefreshTokenExists,
        withToken
    }
}
