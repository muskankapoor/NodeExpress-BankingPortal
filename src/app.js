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

// payment route 
app.get('/payment', (req, res) => {
    res.render('payement', {account: accounts.credit});

});

// payment post 

app.post('/payment', (req, res) => {
    accounts.credit.balance -=  req.body.amount;
    parseInt(accounts.credit.available) += parseInt(req.body.amount);
    let accountsJSON = JSON.stringify(accounts);

      
    // write file sync
    fs.writeFileSync('src/json/accounts.json', accountsJSON, encoding='utf-8');
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

// transfer post 
app.post('/transfter', (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to],balance += parseInt(req.body.amount);
    let accountsJSON = JSON.stringify(accounts);
   
    // write file sync
    fs.writeFileSync('src/json/accounts.json', accountsJSON, encoding='utf-8');
    res.render('transfer', {message: "Transfer Completed"});
});

// create a server
app.listen(3000, function(){
    console.log("PS Project Running on port 3000!");
});

