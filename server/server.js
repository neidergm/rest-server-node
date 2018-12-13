require("./config/config");

const express = require("express");
const app = express();

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


app.get("/user", (req, resp) => {
    resp.json("getUser");
});

app.post("/user", (req, resp) => {

    let person = req.body;

    resp.json(person);
});

app.put("/user/:id", (req, resp) => {

    let id = req.params.id;
    resp.json("putUser " + id);
});

app.delete("/user", (req, resp) => {
    resp.json("deleteUser");
});

app.listen(process.env.PORT, function () {
    console.log(`Listening port ${process.env.PORT}...`);
});