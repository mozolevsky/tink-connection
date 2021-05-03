import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import { auxiliaryServices } from '../../services/auxiliaryServices'
import { CompanyInfo } from '../../models/companies'
import notFoundImgPath from '../../img/404.png'

const useStyles = makeStyles({
    logo: {
        width: '6rem',
        height: '6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo_img: {
        width: '100%'
    }
})

export const Logo: React.FC<{ companyName: string }> = ({ companyName }) => {
    const styles = useStyles()

    const { data, isLoading, refetch } = useQuery('getCompanyInfo', () =>
        auxiliaryServices.loadCompanyLogo(companyName)
    )

    useEffect(() => {
        refetch()
    }, [companyName])

    const renderLogo = (info: CompanyInfo) => {
        const { domain, logoLink } = info

        return (
            <Link
                href={domain}
                target="_blank"
                rel="noreferrer"
            >
                <img className={styles.logo_img} src={logoLink ?? notFoundImgPath} alt={companyName}/>
            </Link>
        )
    }

    return (
        <section className={styles.logo}>
            {isLoading ? <CircularProgress /> : renderLogo(data!)}
        </section>
    )
}
