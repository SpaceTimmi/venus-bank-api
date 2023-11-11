const http = require('http');
const fs = require('fs');
const url = require('url');
require('dotenv').config();
const { Bank } = require('./class/bank');

let bank = new Bank();
let accounts;

function addAccountToDb(singleAccount) {
    // Add a new account to the database and
    // pull data from the database (data.json)
    fs.readFile('./data/data.json', (err, data) => {
    if (err){
        throw new Error(err);
    } else {
        obj = JSON.parse(data);
        obj['accounts'].push({
            "id": singleAccount.getId(),
            "fname": singleAccount.getFirstName(),
            "lname": singleAccount.getLastName(),
            "number" : singleAccount.getAccountNumber(),
            "balance" : singleAccount.getBalance(),
            "pin" : singleAccount.pin,
            "type" : singleAccount.getType()
        });
        json = JSON.stringify(obj);
        fs.writeFile('./data/data.json', json, function(error) {
            if(error) {
                console.log('[write auth]: ' + err);
            } else {
                console.log('[write auth]: success');
            }});
    }});
    pullData();
    return;
}

function pullData() {
    // Read JSON file and create a Bank class with the data.
    const accountsJson = require('./data/data.json');
    accounts = bank.loadAccounts(accountsJson);
    return accountsJson;
}

function updateData() {
    // From data in the Bank Object update the json file

}

const server = http.createServer((req, res) => {
    let urlParsed = url.parse(req.url, true)
    req.body = urlParsed.query;

    console.log(req.method, req.url);
    console.log(req.body);

    // NORMAL ENDPOINTS //
    let lengthOfBody = Object.keys(req.body).length

    // GET /accounts
    if (req.method === 'GET' && req.url === '/accounts') {
        let accountsJson = pullData();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(accountsJson));
        res.end();
        return;
    }

    // POST   /accounts/:fname/:lname/:balance/:pin/:type
    if (req.method === 'POST' && req.url.startsWith('/accounts') && lengthOfBody === 5) {
        let _ = pullData();
        let accountObj = bank.addAccount(
            req.body.fname,
            req.body.lname,
            req.body.balance,
            req.body.pin,
            req.body.type
        );
        let a = addAccountToDb(accountObj);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end("Success!");
        return;
    }

    // PUTS /accounts/operation/:accountId/:newValue
    // Where operations is one of: fname | lname | pin | type |
    if (req.method === 'PUT' && req.url.startsWith('/accounts') && lengthOfBody === 2) {
        let urlParts = req.url.split('/')
        let operation = urlParts[2].split('?')[0];
        console.log(operation);
        let _ = pullData();

        bank.updateAccountInfo(
            req.body.accountId,
            operation,
            req.body.newValue
        );

        updateData();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end("Success!");
        return;
    }

    // PUT /accounts/:senderId/:reciverId/:amount
    // DELETE /accounts/:accountId

});

const port = process.env.PORT;
server.listen(port, () => { console.log('Server is listening on port:', port)});
