// require built-in libraries 
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// configure the view and static directory 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// middleware to handle POST data
app.use(express.urlencoded, { extended: true });

// readFileSync to read contetns of file
const accountData = fs.readFileSync('src/json/accounts.json', encoding='utf-8');
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('src/json/users.json', encoding='utf-8');
const users = JSON.parse(userData);

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

app.post('/transfter', (req, res) => {
    const currentAmount = accounts["amount"].balance;
    const fromAmount = acounts["from"].balance;
    const balance = currentAmount - fromAmount;
    accounts[balance].balance;

});

// create a server
app.listen(3000);

