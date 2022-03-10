require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

const Comments = require("./comments");
const User = require("/.user");

app.use(express.json());

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
  
        res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

//registrar comentario no livro
app.post("/registerCom", async (req, res) => {
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

//excluir comentario

//list

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.m7e5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
).then(() => {
    console.log("Conectou ao banco!");
    app.listen(3000);
}).catch((err) => console.log(err));