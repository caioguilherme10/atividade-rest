import React, { Component } from 'react';

import { useHistory, Link } from "react-router-dom";

import axios from "axios";

import { makeStyles , withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const { innerWidth: width, innerHeight: height } = window;

const styles = {
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
        backgroundColor: "#785e26"
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
    contentChild: {
        height: height - height * 0.1,
        width: width - width * 0.5,
        display: "flex",
        flexDirection:"column",
        //justifyContent: "center",
        //alignItems: "center",
    },
    usersList: {
        position: "static",
        overflow: "scroll",
    },
    paper: {
        marginTop: height - height * 0.99,
        height: height - height * 0.95,
        width: width - width * 0.52,
        backgroundColor: "#785e26",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
    },
    usersName: {
        fontSize: 18,
        color: 'white'
    },
    contentChat: {
        height: height - height * 0.2,
        width: width - width * 0.52,
        display: "flex",
        flexDirection:"column",
    },
    divTitle: {
        marginTop: height - height * 0.99,
        backgroundColor: "#785e26",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
    },
    divInputButton: {
        height: height - height * 0.9,
        width: width - width * 0.52,
        display: "flex",
        flexDirection:"row",
        alignItems: "center",
    },
    userMensagem: {
        width: width - width * 0.68,
        marginRight: width - width * 0.99,
    },
    mensagemName: {
        fontSize: 14,
        color: 'white',
    },
    divMensagemR: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: width - width * 0.995,
    },
    divMensagemRR: {
        borderRadius: width - width * 0.99,
        backgroundColor: "#785e26",
        padding: width - width * 0.995,
    },
    divMensagemL: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: width - width * 0.995,
    },
    divMensagemLL: {
        borderRadius: width - width * 0.99,
        backgroundColor: "#785e26",
        padding: width - width * 0.995,
    },
    divLisMensagens: {
        width: "100%",
        height: "100%",
        overflow: "auto",
    },
};

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

class Principal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listUsers: [],
        mensagens: [],
        userName: "",
        userId: "",
        userEmail: "",
        chatOpen: false,
        classes: props.classes,
        userChat: {},
        chatId: "",
        mensagem: "",
      };
    }

    async componentDidMount() {

        this.setState({ userName: localStorage.getItem("userName") });
        //this.setState({ userId: localStorage.getItem("userId") });

    }

    routeChange=()=> {
        localStorage.setItem("@token", "");
        localStorage.setItem("user", "");
    }

    render() {
        return ( 
            <div className={this.state.classes.main}>
                <div className={this.state.classes.top}>
                    <Typography className={this.state.classes.title}>
                        {this.state.userName}
                    </Typography>
                    <ButtonStyles 
                        variant="contained" 
                        onClick={this.routeChange}
                        component={Link}
					    to={{
							pathname: "/login",
						}}
                    >
                        Sair
                    </ButtonStyles>
                </div>
                <div className={this.state.classes.content}>
                    principal
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Principal);