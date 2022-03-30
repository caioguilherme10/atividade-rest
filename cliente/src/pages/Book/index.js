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
    listitemcom: {
        border: "2px solid #004d40",
        borderRadius: "5px",
        //height: height - height * 0.90,
        marginTop: height - height * 0.99,
        marginBottom: height - height * 0.99,
        padding: "5px 5px 5px 5px",
        display: "flex",
        flexDirection: "row",
    },
    divpagination: {
        margin: "2%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    listcom: {
        margin: "2%",
        width: width - width * 0.10,
    },
    divCP: {
        //margin: "2%",
        width: "100%",
    },
    divComentarios: {
        width: width - width * 0.05,
        height: height - height * 0.70,
        marginLeft: width - width * 0.99,
        marginRight: width - width * 0.99,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    comentario: {
        flex: 'none',
        width: width - width * 0.50,
        //height: height - height * 0.95,
        wordWrap: 'break-word',
        wordBreak: 'break-all',
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

const ButtonStylesDelete = withStyles({
    root: {
        width: "200px",
        color: "#FFF",
        backgroundColor: colors.red,
        '&:hover': {
            backgroundColor: colors.red
        },
    },
})(Button);

const Book = (props) => {
    const classes = useStyles();

    let location = useLocation();
    let navigate = useNavigate();

    const [book] = useState(location.state.from);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(1);
	const [isError, setIsError] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [pageComentarios, setPageComentarios] = useState([]);

    const paginationManager = (comentariosArray) => {
		setCount(Math.ceil(comentariosArray.length / 6))
		let array = []
		let comentariosFinal = []
		let arrayComentarios = [...comentariosArray]
		for (let i = 0; i < Math.ceil(comentariosArray.length / 6); i++) {
			array = arrayComentarios.splice(0, 6)
			comentariosFinal.push(array)
		}
		setComentarios(comentariosFinal[0] ? comentariosFinal[0] : [])
		setPageComentarios(comentariosFinal)
	};

    const handleChangePage = (event, value) => {
		setPage(value);
		setComentarios(pageComentarios[value - 1]);
	};

    const deleteComentario = async (id) => {
        console.log(id);
        await axios.delete(`http://localhost:10000/comment/${id}`, {
			headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", 
                "Content-Type": "application/json",
                'Authorization': `Token ${localStorage.getItem('@token')}`
            },
		}
		).then(response => {
			navigate("/principal");
		}).catch(function (error) {
			console.log(error);
		})
    };

    const handleToggle = (value) => {
        console.log(value);
    };

    async function fetchData() {
		setIsError(false);
		await axios.get(`http://localhost:10000/comments/${book.id}`, {
			headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", 
                "Content-Type": "application/json",
                'Authorization': `Token ${localStorage.getItem('@token')}`
            },
		}
		).then(response => {
			console.log(response.data.comment);
			paginationManager(response.data.comment)
		}).catch(function (error) {
			//console.log(error.response.data);
			setIsError(true);
		})
	}

	useEffect(() => {
		fetchData();
	}, []);

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
                    <div className={classes.divComentarios}>
                        {isError ? (<div>Algo deu errado contate o gerente de TI ...</div>) : (
                            <div className={classes.divCP}>
                                <List className={classes.listcom}>
                                    {comentarios.map((value, key) => {
                                        let teste = value.name===localStorage.getItem('userName');
                                        return (
                                            <ListItem className={classes.listitemcom} key={key} role={undefined} dense button onClick={handleToggle(value)}>
                                                <ListItemText className={classes.comentario} primary={`${value.comment}`} />
                                                <ListItemSecondaryAction>
                                                    {teste ? (
                                                        <ButtonStylesDelete
                                                            variant="contained"
                                                            onClick={() => deleteComentario(value._id)}
                                                        >
                                                            Deletar
                                                        </ButtonStylesDelete>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                    )}
                                </List>
                                <div className={classes.divpagination}>
							        <Pagination count={count} page={page} onChange={handleChangePage} />				
						        </div>
                            </div>
                        )}
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default Book