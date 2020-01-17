const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

//Dados serão salvos no MongoDB, um banco de dados não relacional (NoSQL)
//string de conexão
mongoose.connect('mongodb+srv://omnistack10:omnistack10@omnistack10-ndzuo.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(routes);


server.listen(3333);