const express = require('express');
const app = express();

const _ = require('underscore');

const Categories = require('./../models/categories');
const { verifyToken } = require('./../middlewares/authorization');

// Show all categories
app.get("/categories", verifyToken, (req, resp) => {

    Categories.find({})
        .sort('description')
        .populate('user', "name email")
        .exec(function (error, response) {

            if (error) {
                return resp.status(500).json({
                    ok: false,
                    error
                })
            }

            if (!response) {
                return resp.status(400).json({
                    ok: false,
                    error
                })
            }

            return resp.status(200).json({
                ok: true,
                response
            })

        });
});

// Show one categorie by id
app.get("/categories/:id", verifyToken, (req, resp) => {

    let id = req.params.id;

    Categories.findById({ _id: id })
        .populate('user', "name email")
        .exec(function (error, response) {

            if (error) {
                return resp.status(500).json({
                    ok: false,
                    error
                });
            }

            if (!response) {
                return resp.status(400).json({
                    ok: false,
                    error
                });
            }

            return resp.status(200).json({
                ok: true,
                response
            });
        });
});

//Add a categorie
app.post("/categories", verifyToken, (req, resp) => {

    let body = req.body;

    let categorie = new Categories({
        description: body.description,
        user: req.user.data._id
    });

    categorie.save(function (error, response) {
        if (error) {
            return resp.status(500).json({
                ok: false,
                error
            });
        }

        if (!response) {
            return resp.status(400).json({
                ok: false,
                error
            });
        }

        return resp.status(200).json({
            ok: true,
            response
        });
    });
});

//Update categorie
app.put("/categories/:id", verifyToken, (req, resp) => {

    let body = req.body;;
    let id = req.params.id;
    let dataDesc = { description: body.description };

    Categories.findOneAndUpdate(id, dataDesc, { new: true, runValidators: true }, (error, response) => {

        if (error) {
            return resp.status(500).json({
                ok: false,
                error
            });
        }

        if (!response) {
            return resp.status(400).json({
                ok: false,
                error
            });
        }

        return resp.status(200).json({
            ok: true,
            response
        });

    });

});

//Delete categorie
app.delete("/categories/:id", verifyToken, (req, resp) => {

    let id = req.params.id;

    Categories.findByIdAndRemove(id, function (error, response) {

        if (error) {
            return resp.status(500).json({
                ok: false,
                error
            });
        }

        if (!response) {
            return resp.status(400).json({
                ok: false,
                error
            });
        }

        return resp.status(200).json({
            ok: true,
            response
        });

    });

});

module.exports = app;