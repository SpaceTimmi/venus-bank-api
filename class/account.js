class Account {

    constructor(id, fname, lname, number, balance, pin, type) {
        // Fix so you don't pass the pin later
        this.id = id;
        this.lname = lname;
        this.fname = fname;
        this.name = this.fname + " " + this.lname;
        this.number = number;
        this.balance = balance;
        this.pin = pin;
        this.type = type;
    }

    getId() {
        return this.id;
    }
    getLastName() {
        return this.lname
    }
    getFirstName() {
        return this.fname
    }
    getName() {
        return this.name;
    }
    getAccountNumber() {
        return this.number;
    }
    getBalance() {
        return this.balance;
    }
    getType() {
        return this.type;
    }

    updateName(fname, lname) {
        if (this.fname !== fname) {
            this._changeFirstName(fname)
        }

        if (this.lname !== lname) {
            this._changeLastName(lname)
        }
    }

    updateBalance(operation, amount) {
        switch(operation) {
            case 'out':
                this._decreaseBalance(amount);
                break;
            case 'in':
                this._increaseBalance(amount);
                break;
            default:
                throw new Error("Invalid operation on balance");
                break;
        }
    }

    updateType() {
        this._changeType();
    }

    changePin(newPin) {
        // Make this require a better password later
            this._updatePin(newPin);
    }

    _increaseBalance(money) {
        this.balance += money;
    }

    _decreaseBalance(money) {
        this.balance -= money;
    }

    _changeLastName(lname) {
        this.lname = lname;
    }

    _changeFirstName(fname) {
        this.fname = fname;
    }

    _changeType() {
        if (this.type === "savings") {
            this.type = "current";
        } else {
            this.type = "savings";
        }
    }

    _updatePin(newPin) {
        this.pin = newPin;
    }
}


module.exports = {
    Account
};
