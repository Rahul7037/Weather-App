
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/main'));

const port = 3000;
app.listen(port, () => {
    console.log("Server Is Running On port:-", port);
});
