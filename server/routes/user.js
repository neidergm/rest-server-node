const express = require("express");
const bcrypt = require('bcrypt');

const _ = require("underscore");
const User = require("../models/user");

const app = express();

// URIs user

app.get("/user", (req, resp) => {

    let begin = Number(req.query.begin || 0);
    let limit = Number(req.query.limit || 5);

    User.find({status: true}, 'name email img google status role')
        .skip(begin)
        .limit(limit)
        .exec((error, response) => {
            if (error) {
                return resp.status(400).json({
                    ok: false,
                    error
                });
            }

            User.count({status: true}, (error, quantity) => {
                resp.json({
                    ok: true,
                    users: response,
                    quantity
                });
            });

        });


});

app.post("/user", (req, resp) => {

    let data = req.body;

    let user = new User({
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password, 10),
        role: data.role
    });

    user.save((err, response) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                error: err
            });
        }

        resp.json(response);
    });
});

app.put("/user/:id", (req, resp) => {

    let id = req.params.id;

    // campos actualizables
    let data = _.pick(req.body, ['name', 'email', 'img', 'status', 'role']);

    User.findIdAndUpdate(id, data, { new: true, runValidators: true }, (error, response) => {
        if (error) {
            return resp.status(400).json({
                ok: false,
                error
            });
        }

        resp.json(response);
    });

});

app.delete("/user/:id", (req, resp) => {

    let id = req.params.id;

    User.findByIdAndUpdate(id, {status: false}, (error, response) => {
        if (error) {
            return resp.status(400).json({
                ok: false,
                error
            })
        }

        resp.json(response);
    });
});

module.exports = app;
