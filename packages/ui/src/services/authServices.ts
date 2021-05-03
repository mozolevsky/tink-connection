export interface IAuthServicesImpl {
    logIn: (code: string) => Promise<any>
    renewToken: (refreshToken: string) => Promise<any>
}

export class AuthServicesImpl implements IAuthServicesImpl {
    apiUrl: string
    options: Record<string, any>

    constructor() {
        this.apiUrl = `${process.env.REACT_APP_API_HOST}/api/v1/oauth/token`
        this.options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    }

    logIn = async (code: string) => {
        const res = await fetch(this.apiUrl, {
            ...this.options,
            body: `code=${code}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=authorization_code`
        })

        return await res.json()
    }

    renewToken = async (refreshToken: string) => {
        const res = await fetch(this.apiUrl, {
            ...this.options,
            body: `refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=refresh_token`
        })

        return await res.json()
    }
}

export const authServices = new AuthServicesImpl()
