import React, { useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import colors from '../../styles/global';

import { Link, useLocation } from "react-router-dom";

const { innerWidth: width, innerHeight: height } = window;

const useStyles = makeStyles({
    main: {
        height: height,
        width: width,
        display: "flex",
        flexDirection:"column",
    },
    top: {
        height: height - height * 0.9,
        width: width,
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.teal800
    },
    title: {
        fontSize: 22,
        color: 'white'
    },
    content: {
        height: height - height * 0.1,
        width: width,
        display: "flex",
        flexDirection:"row",
    },
    paper: {
        marginTop: height - height * 0.99,
        //marginBottom: height - height * 0.88,
        marginLeft: width - width * 0.99,
        marginRight: width - width * 0.99,
        height: height - height * 0.30,
        width: width,
        backgroundColor: "#b2dfdb",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
    },
});

const ButtonStyles = withStyles({
    root: {
        width: "200px",
        color: "#FFF",
        backgroundColor: colors.teal800,
        '&:hover': {
            backgroundColor: colors.tealA700
        },
    },
})(Button);

const Book = (props) => {
    const classes = useStyles();

    let location = useLocation();

    const [book] = useState(location.state.from);

    return(
        <div className={classes.main}>
            <div className={classes.top}>
                <Typography className={classes.title}>
                    Livro
                </Typography>
                <ButtonStyles 
                        variant="contained"
                        component={Link}
					    to={{
							pathname: "/principal",
						}}
                    >
                        Voltar
                </ButtonStyles>
            </div>
            <div className={classes.content}>
                <Paper className={classes.paper} elevation={1}>
                        Book
                </Paper>
            </div>
        </div>
    )
}

export default Book