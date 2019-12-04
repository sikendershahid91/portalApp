const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();



app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose.connect(db,
		 {
		     useNewUrlParser: true,
		     useCreateIndex: true
		 }).then(() => console.log("MongoDB successfully connected!"))
                 .catch(err => console.log(err));

//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server up and running on port ${port} !`));
