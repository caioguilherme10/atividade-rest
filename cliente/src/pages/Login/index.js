import React, { useEffect, useState } from 'react';

import { useHistory } from "react-router-dom";

import axios from "axios";

import { makeStyles , withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
        color: '#785e26'
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
            color: '#785e26',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#785e26',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: '#785e26',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#785e26'
            },
        },
    },
})(TextField);

const ButtonStyles = withStyles({
    root: {
        width: "200px",
        color: "#FFF",
        backgroundColor: '#785e26',
        '&:hover': {
            backgroundColor: '#785e26'
        },
    },
})(Button);

const Login = (props) => {
    const classes = useStyles();

    const history = useHistory();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const Authenticate = () => {
        axios
            .post(`http://localhost:10000/login`, {
                name: name,
                password: password,
            },{
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
            })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("@token", response.data.token);
                //localStorage.setItem("userId", response.data.user._id);
                //localStorage.setItem("userName", response.data.user.name);
                history.push("/");
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
                                LOGIN
                            </Typography>
                        </div>
                        <div className={classes.contentDiv}>
                            <div>
                                <CssTextField
                                    id="user-name"
                                    className={classes.userName}
                                    label="Nome"
                                    margin="normal"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div>
                                <CssTextField
                                    id="Password"
                                    className={classes.password}
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
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
                                history.push("/cadastro");
                            }}
                        >
                            Cadastrar
                        </ButtonStyles>
                        <ButtonStyles variant="contained" onClick={Authenticate}>Entrar</ButtonStyles>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default Login