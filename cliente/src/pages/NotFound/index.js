import React from 'react';
import { useHistory } from "react-router-dom";

// Internal Styles.
import { useStyles, ButtonStyles } from "./styles";

const NotFound = () => {
    const classes = useStyles();

    const history = useHistory();

    const voltar = () => {
        history.push("/");
    }
    return ( 
        <div className={classes.root}>
            <div className={classes.title}>
                Página não encontrada!
            </div>
            <div className={classes.divBreak}/>
            <div>
                <ButtonStyles variant="contained" onClick={voltar}>Voltar</ButtonStyles>
            </div>
        </div>
    )
}

export default NotFound;