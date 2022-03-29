require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const app = express();

const Comments = require("./comments");
const User = require("./user");

app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}));

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  
    try {
        const secret = process.env.SECRET;
  
        jwt.verify(token, secret);
  
        next();
    } catch (err) {
        res.status(400).json({ msg: "O Token é inválido!" });
    }
}

//registrar usuario
app.post("/register", async (req, res) => {
    const { name, password } = req.body;
  
    // validations
    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }
  
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
  
    // check if user exists
    const userExists = await User.findOne({ name: name });
  
    if (userExists) {
        return res.status(422).json({ msg: "Por favor, utilize outro nome" });
    }
  
    // create user
    const user = new User({
        name: name,
        password: password,
    });
  
    try {
        await user.save();
  
        res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

//login
app.post("/login", async (req, res) => {
    const { name, password } = req.body;
  
    // validations
    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }
  
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
  
    // check if user exists
    const user = await User.findOne({ name: name });
  
    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
  
    if (password !== user.password) {
        return res.status(422).json({ msg: "Senha inválida" });
    }
  
    try {
        const secret = process.env.SECRET;
  
        const token = jwt.sign({
                id: user._id,
            },
            secret
        );
  
        res.status(200).json({ msg: "Autenticação realizada com sucesso!", token , user });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

//registrar comentario no livro
app.post("/registercom", checkToken, async (req, res) => {
    const { iduser, book , comment } = req.body;

    // check if user exists
    const user = await User.findOne({ _id: iduser });
  
    // validations
    if (!user) {
        return res.status(422).json({ msg: "O usuario é obrigatório!" });
    }
  
    if (!book) {
        return res.status(422).json({ msg: "O livro é obrigatória!" });
    }

    if (!comment) {
        return res.status(422).json({ msg: "O comentario é obrigatória!" });
    }
  
    // create comment
    const comments = new Comments({
        name: user.name,
        book: book,
        comment: comment
    });
  
    try {
        await comments.save();
  
        res.status(201).json({ msg: "Comentario criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

//list
app.get("/comments/:id", checkToken, async (req,res) => {
    const id = req.params.id;
    const comment = await Comments.find({ book: id });
    console.log(comment);
    res.status(200).json({ comment: comment });
});

//excluir comentario
app.delete("comment/:id", checkToken, async (req,res) => {
    const id = req.params.id;
    try {
        await Comments.deleteOne({ _id: id });
        res.status(200).json({ msg: "Excluido com Sucesso!" });
    } catch (err) {
        res.status(500).json({ msg: error });
    }
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.m7e5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
).then(() => {
    console.log("Conectou ao banco!");
    app.listen(4000);
}).catch((err) => console.log(err));