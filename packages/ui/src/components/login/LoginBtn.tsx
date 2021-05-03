import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    submit: (styles) => ({
        margin: theme.spacing(3, 0, 2),
        width: '65%',
        ...styles
    })
}))

export type LoginBtnProps = {
    styles?: Record<string, string>
}

const redirectLink = process.env.REACT_APP_TINK_REDIRECT_LINK

export const LoginBtn: React.FC<LoginBtnProps> = ({
    children = 'Log In',
    styles = {}
}) => {
    const classes = useStyles(styles)

    const handleClick = () => {
        if (redirectLink) window.location.assign(redirectLink)
    }

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
        >
            {children}
        </Button>
    )
}
