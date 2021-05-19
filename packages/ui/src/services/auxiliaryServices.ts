import type { CompanyInfo } from '../models/companies'

export interface IAuxiliaryServicesImpl {
    loadCompanyLogo: (companyName: string) => Promise<CompanyInfo>
}

const logosCache = new Map()
export class AuxiliaryServicesImpl implements IAuxiliaryServicesImpl {
    loadCompanyLogo = (companyName: string): Promise<CompanyInfo> => new Promise((resolve, reject) => {
    
            if (logosCache.has(companyName)) {
                    resolve(logosCache.get(companyName))
            } else {
                fetch(
                    `${process.env.REACT_APP_API_LOGOS_HOST}/logos`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            companyName
                        })
                    }
                ).then(res => {
                    const transformedRes = res.json()

                    logosCache.set(companyName, transformedRes)

                    resolve(transformedRes)
                }).catch(console.error)

                
            }
    })
}

export const auxiliaryServices = new AuxiliaryServicesImpl()
