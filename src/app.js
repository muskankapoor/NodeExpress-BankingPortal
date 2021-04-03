// require built-in libraries 
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const { accounts, users, writeJSON } = require('./data.js');

// configure the view and static directory 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// middleware to handle POST data
app.use(express.urlencoded({ extended: true }));

// index route 
app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));

// savings route
app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings });
});

// checking route
app.get('/checking', (req, res) => {
    res.render('account', { account: accounts.checking });
});

// credit route
app.get('/credit', (req, res) => {
    res.render('account', { account: accounts.credit });
});

// profile route
app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] });
});

// transfer route
app.get('/transfer', (req, res) => {
    res.render('transfer');
});

// transfer post
app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += parseInt(req.body.amount, 10);   
    writeJSON();
    res.render('transfer', {message: 'Transfer Completed'});
});

app.get('/payment', (req, res) => {
    res.render('payment', {account: accounts.credit});
});

app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});


// create a server
app.listen(3000, function(){
    console.log("PS Project Running on port 3000!");
});

