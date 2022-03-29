import React, { useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Pagination from '@material-ui/lab/Pagination';
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
        height: height - height * 0.15,
        width: width,
        backgroundColor: "#b2dfdb",
        display: "flex",
        flexDirection:"column",
        //justifyContent: "center",
        //alignItems: "center",
    },
    list: {

    },
    listitem: {

    },
    book: {
        display: "flex",
        flexDirection:"row",
    },
    divBook: {
        display: "flex",
        flexDirection:"row",
        margin: "5px",
    },
    titleBook: {
        fontSize: 12,
        color: 'black',
        marginLeft: '5px',
    },
    titleBookT: {
        fontSize: 12,
        color: 'black',
        marginLeft: '5px',
        fontWeight: 'bold',
    },
    listTitleBook: {
        
    },
    divAutBut: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    paperBook: {
        width: width - width * 0.05,
        height: height - height * 0.80,
        backgroundColor: "#b2dfdb",
        marginTop: height - height * 0.99,
        marginBottom: height - height * 0.99,
        marginLeft: width - width * 0.99,
        marginRight: width - width * 0.99,
    },
});

const ButtonStyles = withStyles({
    root: {
        width: "400px",
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
                <Paper className={classes.paper} elevation={2}>
                    <Paper className={classes.paperBook} elevation={1}>
                        <div className={classes.book}>
                            <div className={classes.divBook}>
                                <div><Typography className={classes.titleBookT}>titulo:</Typography></div>
                                <div><Typography className={classes.titleBook}>{book.volumeInfo.title}</Typography></div>
                            </div>
                            <div className={classes.divBook}>
                                <div><Typography className={classes.titleBookT}>sub titulo:</Typography></div>
                                <div><Typography className={classes.titleBook}>{book.volumeInfo.subtitle}</Typography></div>
                            </div>
                            <div className={classes.divBook}>
                                <div><Typography className={classes.titleBookT}>publisher:</Typography></div>
                                <div><Typography className={classes.titleBook}>{book.volumeInfo.publisher}</Typography></div>
                            </div>
                            <div className={classes.divBook}>
                                <div><Typography className={classes.titleBookT}>publishedDate:</Typography></div>
                                <div><Typography className={classes.titleBook}>{book.volumeInfo.publishedDate}</Typography></div>
                            </div>
                            <div className={classes.divBook}>
                                <div><Typography className={classes.titleBookT}>description:</Typography></div>
                                <div><Typography className={classes.titleBook}>{book.volumeInfo.description}</Typography></div>
                            </div>
                        </div>
                        <div className={classes.divAutBut}>
                            <div className={classes.divBook}>
                                <div><Typography className={classes.titleBookT}>autores:</Typography></div>
                                <div>
                                    <List className={classes.listTitleBook}>
                                        {book.volumeInfo.authors.map((value, key) => (
                                            <ListItem key={key} >
                                                <ListItemText primary={`${value}`}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </div>
                            <div>
                                <ButtonStyles 
                                    variant="contained"
                                    component={Link}
					                to={{
							            pathname: "/cadastro-comentario",
						            }}
                                    state={{ from: book }}
                                >
                                    Cadastro Comentario
                                </ButtonStyles>
                            </div>
                        </div>
                    </Paper>
                    <div>
                        list comentarios
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default Book