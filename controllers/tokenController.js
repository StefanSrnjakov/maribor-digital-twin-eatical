const TokenModel = require('../models/tokenModel.js');

module.exports = {

    list: function (req, res) {
        TokenModel.find(function (err, tokens) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting token.',
                    error: err
                });
            }

            return res.json(tokens);
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
