import React, { Component } from 'react';

import { Link } from "react-router-dom";

//import axios from "axios";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Pagination from '@material-ui/lab/Pagination';
//import TextField from '@material-ui/core/TextField';
import colors from '../../styles/global';

import livros from './const';

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
    contentChild: {
        height: height - height * 0.1,
        width: width - width * 0.5,
        display: "flex",
        flexDirection:"column",
        //justifyContent: "center",
        //alignItems: "center",
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
    list: {
        width: width - width * 0.11,
    },
    listitem: {
        border: "2px solid #004d40",
        borderRadius: "5px",
        marginTop: height - height * 0.99,
        marginBottom: height - height * 0.99,
        padding: "5px 5px 5px 5px",
    },
    divpagination: {
        margin: "2%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    usersName: {
        fontSize: 18,
        color: 'white'
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
};

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

class Principal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listBooks: [],
        pageBooks: [],
        userName: "",
        userId: "",
        chatOpen: false,
        classes: props.classes,
        page: 1,
        count: 1,
      };
    }

    async componentDidMount() {

        this.setState({ userName: localStorage.getItem("userName") });
        this.setState({ userId: localStorage.getItem("userId") });
        this.paginationManager(livros.items, livros.totalItems);

    }

    routeChange=()=> {
        localStorage.setItem("@token", "");
        localStorage.setItem("user", "");
    }

    handleToggle = value => () => {
        
    };
    
    handleChangePage = (event, value) => {
		this.setState({ page: value });
        this.setState({ listBooks: this.state.pageBooks[value - 1] });
	};

    paginationManager = (booksArray, booksLength) => {
        this.setState({ count: Math.ceil(booksLength / 6) });
		let array = []
		let booksFinal = []
		let arrayBooks = [...booksArray]
		for (let i = 0; i < Math.ceil(booksLength / 6); i++) {
			array = arrayBooks.splice(0, 6)
			booksFinal.push(array)
		}
        this.setState({ listBooks: booksFinal[0] ? booksFinal[0] : [] });
        this.setState({ pageBooks: booksFinal });
	}

    //sendBook = (valor) => {

    //}

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
							pathname: "/auth/login",
						}}
                    >
                        Sair
                    </ButtonStyles>
                </div>
                <div className={this.state.classes.content}>
                    <Paper className={this.state.classes.paper} elevation={1}>
                        <List className={this.state.classes.list}>
                            {this.state.listBooks.map(value => (
                                <ListItem className={this.state.classes.listitem} key={value.id} role={undefined} dense button onClick={this.handleToggle(value)}>
                                    <ListItemText primary={`${value.volumeInfo.title}`} />
                                    <ListItemSecondaryAction>
                                        <ButtonStyles 
                                            variant="contained"
                                            //onClick={this.sendBook(value)}
                                            component={Link}
					                        to={{
							                    pathname: "/book"
						                    }}
                                            state={{ from: value }}
                                        >
                                            Ver
                                        </ButtonStyles>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <div className={this.state.classes.divpagination}>
							<Pagination count={this.state.count} page={this.state.page} onChange={this.handleChangePage} />				
						</div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Principal);