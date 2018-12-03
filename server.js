const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const expressJWT = require('express-jwt');
 
require('dotenv').config();
require('./db/connect');

const app = express();

app.use(logger('dev'));

app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Configure express' body-parser to parse into req.body; body, url  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount auth routes with rate limiting middleware
// app.use('/auth/login', require('./routes/middleware/loginLimiter'));
// app.use('/auth/signup', require('./routes/middleware/signupLimiter'));
app.use('/auth', require('./routes/auth/auth'));

// Mount API routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/raidgroups', require('./routes/api/raidgroups'));
// app.use('/raids', require('./routes/api/raids'))
// app.use('/items', require('./routes/api/items'))

// This line uses the express-jwt to protect the routes
app.use('/locked', expressJWT({secret: process.env.JWT_SECRET}).unless({method: 'POST'}), require('./routes/auth/locked'));

// Catch-all route - Send react app
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = server;