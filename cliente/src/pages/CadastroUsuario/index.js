import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { makeStyles , withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import colors from '../../styles/global';

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
    root: {
        minWidth: 500,
    },
    title: {
        fontSize: 22,
        color: colors.teal800
    },
    pos: {
        marginBottom: 12,
    },
    buttonDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-around",
        marginBottom: height - height * 0.98,
    },
    cardDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection:"column",
    },
    titleDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
    },
    userName: {
        width: 300,
    },
    password: {
        width: 300
    },
    contentDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: height - height * 0.98,
        marginBottom: height - height * 0.98,
    },
});

const CssTextField = withStyles({
    root: {
        marginTop: 5,
        '& label.Mui-focused': {
            color: colors.tealA700,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colors.tealA700,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: colors.tealA700,
            },
            '&.Mui-focused fieldset': {
                borderColor: colors.tealA700
            },
        },
    },
})(TextField);

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

const Cadastro = (props) => {
    const classes = useStyles();

    const navigate = useNavigate();

    const [nameC, setNameC] = useState("");
    const [passwordC, setPasswordC] = useState("");

    const instance = axios.create({
        baseURL: 'http://localhost:10000',
        //timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    });

    const Salvar = () => {
        instance.post('/register', {
                name: nameC,
                password: passwordC,
            }
            /*,{
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
            }*/
            )
            .then((response) => {
                console.log(response.data);
                navigate("/auth/login");
            })
            .catch((error) => {
                console.log(error.response.data)
        });
    };

    return(
        <div className={classes.main}>
            <Card className={classes.root}>
                <CardContent>
                    <div className={classes.cardDiv}>
                        <div className={classes.titleDiv}>
                            <Typography className={classes.title}>
                                CADASTRO
                            </Typography>
                        </div>
                        <div className={classes.contentDiv}>
                            <div>
                                <CssTextField
                                    id="user-name-c"
                                    className={classes.userName}
                                    label="Nome"
                                    margin="normal"
                                    value={nameC}
                                    onChange={(event) => setNameC(event.target.value)}
                                />
                            </div>
                            <div>
                                <CssTextField
                                    id="Password-c"
                                    className={classes.password}
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    autoComplete="current-password"
                                    value={passwordC}
                                    onChange={(event) => setPasswordC(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardActions>
                    <div className={classes.buttonDiv}>
                        <ButtonStyles 
                            variant="contained" 
                            onClick={() => {
                                navigate("/auth/login");
                            }}
                        >
                            Login
                        </ButtonStyles>
                        <ButtonStyles variant="contained" onClick={Salvar}>Confirmar</ButtonStyles>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default Cadastro