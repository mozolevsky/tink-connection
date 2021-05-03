import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { LoginBtn } from './LoginBtn'

const useStyles = makeStyles((theme) => ({
    paper: (styles) => ({
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }),
    avatar: (styles) => ({
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        height: '4rem',
        width: '4rem'
    })
}))

export type LoginPageProps = {
    title?: string
    btnInner?: React.ReactElement
    styles?: Record<string, string>
}

export const LoginPage: React.FC<LoginPageProps> = ({
    title = 'Welcome',
    btnInner,
    styles
}) => {
    const classes = useStyles(styles ?? {})

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <section className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <LoginBtn>{btnInner}</LoginBtn>
            </section>
        </Container>
    )
}
