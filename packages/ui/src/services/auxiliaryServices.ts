import type { CompanyInfo } from '../models/companies'

export interface IAuxiliaryServicesImpl {
    loadCompanyLogo: (companyName: string) => Promise<CompanyInfo>
}

export class AuxiliaryServicesImpl implements IAuxiliaryServicesImpl {
    loadCompanyLogo = async (companyName: string): Promise<CompanyInfo> => {
        const res = await fetch(
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
        )

        return await res.json()
    }
}

export const auxiliaryServices = new AuxiliaryServicesImpl()
