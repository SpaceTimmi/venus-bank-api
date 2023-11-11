const { Account } = require('./account')

class Bank {

    constructor() {
        this.accounts = {};
    }

    loadAccounts(data) {
        // Load accounts from data.json
        for (let i = 0; i < data.accounts.length; i++) {
            let accountObj = data.accounts[i];

            let account = new Account(
                accountObj['id'],
                accountObj['fname'],
                accountObj['lname'],
                accountObj['number'],
                accountObj['balance'],
                accountObj['pin'],
                accountObj['type']
            );
            this.accounts[accountObj['id']] = account;
        }
        return this.accounts;
    }

    getAccounts(){
        return this.accounts;
    }

    addAccount(fname, lname, balance, pin, type ) {
        let nextId = this._getNextId();
        let accountNumber = this._getNewAccountNumber();
        let account = new Account(
            nextId,
            fname,
            lname,
            accountNumber,
            balance,
            pin,
            type
        );
        this.accounts[nextId] = account;

        return account;
    }

    removeAccount(accountId) {
        if (this.accounts[accountId] === undefined) {
            throw new Error("Failed to delete account. Account not found");
        }
        return delete(this.accounts[accountId])
    }

    updateAccountInfo(accountId, updateType, update) {
        if (this.accounts[accountId] === undefined) {
            throw new Error("Account not found")
        }

        let account = this.accounts[accountId];
        let fname = account.getFirstName();
        let lname = account.getLastName();


        switch(updateType) {
            case 'lname':
                account.updateName(fname, update);
                break;
            case 'fname':
                account.updateName(update, lname);
                break;
            case 'pin':
                account.changePin(update);
                break;
            case 'type':
                account.updateType();
            default:
                throw new Error("Invalid update on account");
        }
    }

    transferMoney(senderAccountId, recieverAccountId, money) {
        if (this.accounts[senderAccountId] === undefined) {
            throw new Error("Sender Account Not valid!")
        }
        if (this.accounts[recieverAccountId] === undefined) {
            throw new Error("Reciever Account Not valid!")
        }

        this.accounts[senderAccountId].updateBalance('out', money);
        this.accounts[recieverAccountId].updateBalance('in', money);
    }

    _getNextId() {
        let nextId = Object.keys(this.accounts).length;
        return nextId
    }

    _getNewAccountNumber(){
        return Math.floor(Math.pow(10, 10-1) + Math.random() * 9 * Math.pow(10, 10-9));
    }
}

module.exports = {
    Bank,
};
