const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

//Dados serão salvos no MongoDB, um banco de dados não relacional (NoSQL)
//string de conexão
mongoose.connect('mongodb+srv://omnistack10:omnistack10@omnistack10-ndzuo.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);


app.listen(3333);