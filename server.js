const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();



app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
<<<<<<< HEAD

mongoose.connect(db,{ useNewUrlParser: true})
    .then(() => console.log('MongoDB successfully connected!'))
    .catch(err => console.log(err));
=======
mongoose.connect(db,
		 {
		     useNewUrlParser: true,
		     useCreateIndex: true
		 }).then(() => console.log("MongoDB successfully connected!"))
                 .catch(err => console.log(err));

//routes
app.use('/api/users', require('./routes/api/users'));
>>>>>>> new_start

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server up and running on port ${port} !`));
