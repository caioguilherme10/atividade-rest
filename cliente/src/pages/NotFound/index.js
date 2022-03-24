import React from 'react';
import { useNavigate } from "react-router-dom";

// Internal Styles.
import { useStyles, ButtonStyles } from "./styles";

const NotFound = () => {
    const classes = useStyles();

    const navigate = useNavigate();

    const voltar = () => {
        navigate("/auth/login");
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