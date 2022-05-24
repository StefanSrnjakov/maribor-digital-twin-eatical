const TokenModel = require('../models/tokenModel.js');
const UserModel = require('../models/userModel.js');
const RestaurantModel = require('../models/restaurantModel.js');
const jwt = require("jsonwebtoken");

module.exports = {

    list: function (req, res) {
        const token = req.header('auth-token');

        if (!token) return res.json({type: 'guest'});

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {

            if (err) return res.json({type: 'guest'});
            if (token.type === "user") {
                UserModel.findById(token.user_id, function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting user.',
                            error: err
                        });
                    }

                    if (!token) {
                        return res.status(404).json({
                            message: 'No such user'
                        });
                    }

                    return res.json({
                        type: "user",
                        user: user
                    });
                });
            } else {
                RestaurantModel.findById(token.user_id, function (err, restaurant){
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting restaurant.',
                            error: err
                        });
                    }

                    if (!token) {
                        return res.status(404).json({
                            message: 'No such restaurant'
                        });
                    }

                    return res.json({
                        type: "restaurant",
                        user: restaurant
                    });
                });
            }
        });
    },

    show: function (req, res) {
        const id = req.params.id;

        TokenModel.findOne({_id: id}, function (err, token) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting token.',
                    error: err
                });
            }

            if (!token) {
                return res.status(404).json({
                    message: 'No such token'
                });
            }

            return res.json(token);
        });
    },

    create: function (req, res) {
        const token = new TokenModel({
			user_id : req.body.user_id,
			type : req.body.type
        });

        token.save(function (err, token) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating token',
                    error: err
                });
            }

            return res.status(201).json(token);
        });
    },

    update: function (req, res) {
        const id = req.params.id;

        TokenModel.findOne({_id: id}, function (err, token) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting token',
                    error: err
                });
            }

            if (!token) {
                return res.status(404).json({
                    message: 'No such token'
                });
            }

            token.user_id = req.body.user_id ? req.body.user_id : token.user_id;
            token.type = req.body.type ? req.body.type : token.type;

            token.save(function (err, token) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating token.',
                        error: err
                    });
                }

                return res.json(token);
            });
        });
    },

    remove: function (req, res) {
        const id = req.params.id;

        TokenModel.findByIdAndRemove(id, function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the token.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
