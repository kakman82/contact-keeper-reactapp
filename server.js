// regular dependencies: npm i express bcryptjs jsonwebtoken config express-validator mongoose
// dev dependencies: npm i -D nodemon concurrently

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//* Connect to DB;
connectDB();

//* Init Middleware;
app.use(express.json({ extended: false }));

//! bu kısım ilk server kurulumunda test için yaptık, heroku deploy öncesi commente almak gerek yoksa home page bu görünür :)
//app.get('/', (req, res) => res.json({ msg: 'Welcome to ContactKeeper API!' }));

//* Define Routes;
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//* Serve static assets - client/build/index.html for production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  //! '*' means all routes and must be after definin routes section above
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
