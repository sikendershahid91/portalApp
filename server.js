const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Successful connections: ${process.env.PORT || 5000}`));
