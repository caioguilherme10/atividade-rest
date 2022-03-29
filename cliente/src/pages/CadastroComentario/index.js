import React, { useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import colors from '../../styles/global';

import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

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
    divComentario: {
        display: "flex",
        flexDirection:"row",
    },
    divComentarioInput: {
        width: width - width * 0.70,
    },
    divButton: {
        marginLeft:  width - width * 0.90,
        display: "flex",
        flexDirection:"column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    inputComentario: {
        width: width - width * 0.70,
    }
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

const CssTextField = withStyles({
    root: {
        //marginBottom: 5,
        '& label.Mui-focused': {
            color: colors.teal800,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colors.tealA700,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: colors.tealA700
            },
        },
    },
})(TextField);

const CadastroComentario = (props) => {
    const classes = useStyles();

    let location = useLocation();
    let navigate = useNavigate();

    const [book] = useState(location.state.from);
    const [comentario, setComentario] = useState('');

    const handleClickSalvar = async () => {
        await axios.post(`http://localhost:10000/registercom`, { 
            iduser: localStorage.getItem('userId'),
            book: book.id,
            comment: comentario,
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", 
                "Content-Type": "application/json",
                'Authorization': `Token ${localStorage.getItem('@token')}`
            },
        }).then(function (response) {
            console.log(response)
            navigate("/principal");
        }).catch((error) => {
            console.log(error)
            //falta tratar o error
        });
    };

    return(
        <div className={classes.main}>
            <div className={classes.top}>
                <Typography className={classes.title}>
                    Cadastro Comentario
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
                <Paper elevation={3} className={classes.paper}>
                    <div className={classes.divComentario}>
                        <div className={classes.divComentarioInput}>
                            <CssTextField
                                id="comentario"
                                className={classes.inputComentario}
                                label="Comentario"
                                multiline
                                type="string"
                                margin="normal"
                                value={comentario}
                                onChange={(event) => setComentario(event.target.value)}
                            />
                        </div>
                        <div className={classes.divButton}>
                            <ButtonStyles 
                                variant="contained"
                                onClick={handleClickSalvar}
                            >
                                Salvar
                            </ButtonStyles>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default CadastroComentario