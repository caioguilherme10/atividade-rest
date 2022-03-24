import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const { innerWidth: width, innerHeight: height } = window;

const useStyles = makeStyles({
    main: {
        height: height,
        width: width,
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
    },
});

const Book = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.main}>
            <h1>Book</h1>
        </div>
    )
}

export default Book