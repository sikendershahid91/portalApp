const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.join());

const port = process.env.PORT || 5000;
app.listen(port, ()=> consol.log("Successful connections"));

