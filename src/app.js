// require built-in libraries 
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const { accounts, users, writeJSON } = require('./data.js');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

// configure the view and static directory 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// middleware to handle POST data
app.use(express.urlencoded({ extended: true }));
app.use('/accounts', accountRoutes);
app.use('/services', servicesRoutes);


// index route 
app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));

// profile route
app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] });
});

// create a server
app.listen(3000, function(){
    console.log("PS Project Running on port 3000!");
});

