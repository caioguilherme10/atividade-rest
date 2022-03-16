import { makeStyles, withStyles } from '@material-ui/core/styles'

import colors from '../../styles/global';
import Button from '@material-ui/core/Button';

export  const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundGray,
        
        [theme.breakpoints.down(700)]: {
            backgroundColor: "#FFF",
        }
    },
    title: {
        fontSize: 40,
        color: colors.primaryOrange,
    },
    divBreak: {
        flexBasis: "100%",
        height: 0
    },
}))


export const ButtonStyles = withStyles({
    root: {
        width: "200px",
        color: "#FFF",
        backgroundColor: colors.primaryOrange,
        '&:hover': {
            backgroundColor: colors.primaryOrangeHover
        },
    },
})(Button);