# Building a backend API with Node.js

After learning about HTML templating and route handling with Node.js, I decided to try and build a backend for a fictional bank called Venus Bank. (In progress)



## Routes
### GET /accounts
Returns a json of all the users accounts.
```
{
    "accounts": [
        {"id":0,"lname":"Monty","fname":"Carla","number":1023494757,"balance":200000,"pin":2440,"type":"current"},
        {"id":1,"lname":"James","fname":"Lucia","number":1023574748,"balance":150000,"pin":1234,"type":"savings"},
        {"id":2,"lname":"James","fname":"Fumy","number":1023564788,"balance":150,"pin":2234,"type":"savings"},
        {"id":3,"lname":"Rico","fname":"Jasmine","number":1023482910,"balance":20000,"pin":1010,"type":"savings"},
        {"id":4,"lname":"Willams","fname":"Charlotte","number":1022130012,"balance":1000,"pin":2345,"type":"savings"},
        {"id":5,"lname":"Willams","fname":"Mikey","number":1023842231,"balance":111000,"pin":1038,"type":"current"},
        {"id":6,"lname":"Monty","fname":"Haily","number":1024328412,"balance":500000,"pin":2999,"type":"current"},
        {"id":7,"lname":"John","fname":"Julia","number":1023443821,"balance":500,"pin":1112,"type":"savings"},
        {"id":8,"lname":"O'Neal","fname":"Shaquiel","number":1023444929,"balance":1000000,"pin":3388,"type":"current"},
        {"id":9,"lname":"Staurt","fname":"Precious","number":1023484808,"balance":35000,"pin":4040,"type":"savings"}
    ]
}
```

### POST /accounts/:fname/:lname/:balance/:type
This endpoint is used to add a new account to the existing data.json file (mock database).
<pre>
fname   -> first name
lname   -> last name
balance -> starting balance of the account
type    -> "current" or "savings" accout
</pre>

### PUTS /accounts/:operation/:accoundId/:newValue
This endpoint is used to update values of individual account based on the given id.
<pre>
operation -> one of: fname | lname | pin | type |
             determines which param in the database is to be updated
accountId -> the account id of the user we're trying to update their details
newValue  -> the new value we're replacing the old value with. i.e /fname/0/"james" will replace the first name of user with "id" 0 to james.
</pre>

### PUT /accounts/:senderId/:recieverId/:amount
This end point is used to transfer money between two users in the mock database.
<pre>
senderId   -> The account id of the account to debit money from.
recieverId -> The account id of the account to credit money to.
amount     -> The amount of money to be debited/credited.
</pre>

### DELETE /accounts/:accountId
This end point is used to delete a user from the mock database.
<pre>
accountId -> The account id of the user we're trying to delete
</pre>
