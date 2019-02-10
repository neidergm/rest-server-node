const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const app = express();

// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.CLIENT_ID);

app.post("/login", (req, resp) => {

    let body = req.body;

    User.findOne({ email: body.email }, (error, response) => {
        if (error) {
            return resp.status(500).json({
                ok: false,
                error
            });
        }

        if (!response) {
            return resp.status(401).json({
                ok: false,
                error: {
                    message: "(User) or password incorrect"
                }
            });
        }

        if (!bcrypt.compareSync(body.password, response.password)) {
            return resp.status(401).json({
                ok: false,
                error: {
                    message: "User or (password) incorrect"
                }
            });
        }

        let token = jwt.sign({
            data: response
        }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXPIRATION });

        resp.json({
            ok: true,
            data: response,
            token
        });
    });
});


module.exports = app;