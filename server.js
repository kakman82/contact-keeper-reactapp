// regular dependencies: npm i express bcryptjs jsonwebtoken config express-validator mongoose
// dev dependencies: npm i -D nodemon concurrently

const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to ContactKeeper API!' }));

// Define Routes;
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
