const UserModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TokenModel = require("../models/tokenModel");

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    show: function (req, res) {
        const id = req.params.id;

        UserModel.findOne({_id: id})
            .populate({
                path: 'orders',
                options: { sort: { 'pick_up_time': -1 } },
                populate: {
                    path: 'meal_id',
                    populate:{
                        path: 'restaurant_id allergens category'
                    }
                }
            })

            .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    create: function (req, res) {
        const user = new UserModel({
			username : req.body.username,
			password : req.body.password,
			email : req.body.email,
			name : req.body.name,
			surname : req.body.surname,
			telephone : req.body.telephone,
			image_id : req.body.image_id,
			orders : []
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },

    register: async function (req, res){
        //Check if the email is already in the database
        const emailExist = await UserModel.findOne({email: req.body.email});
        if(emailExist) return res.status(400).json({error: 'Email already exists'});

        //Check if the username is already in the database
        const usernameExist = await UserModel.findOne({username: req.body.username});
        if(usernameExist) return res.status(400).json({error: 'Username already exists'});

        //Password hashing
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new UserModel({
           username: req.body.username,
           password: hashPassword,
           email: req.body.email,
           name: req.body.name,
           surname: req.body.surname,
           telephone: req.body.telephone
        });

        try{
            const savedUser = await user.save();
            res.send({user: savedUser.id});
        }catch (err){
            res.status(400).send(err);
        }
    },

    login: async function (req, res){
        //Check if the username is in the database
        const user = await UserModel.findOne({username: req.body.username});
        if(!user) {console.log("neakj");
            return res.status(400).json({error: 'Username does not exists'});}

        //Check if password is correct
        // const validPassword = await bcrypt.compare(req.body.password, user.password);
        // if(!validPassword) return res.status(400).json({error: 'Invalid password'});

        //Create and assign a token
        const token = new TokenModel({
            user_id: user._id,
            type: 'user'
        });

        const result = jwt.sign({user_id: user._id, type: 'user'}, process.env.ACCESS_TOKEN_SECRET)

        //Insert token in database
        token.save(function (err, mongoUser) {
            if (err) res.status(500).json({error: 'Token failed to save'});
            return res.header('auth-token', result).json({id: mongoUser._id, token: result, user: user})
        });
    },

    logout: async function (req, res) {
        console.log(req.body.id)

        TokenModel.findByIdAndRemove(req.body.id, function(err, token){
            if (err) return res.status(500).json('Token failed to remove');
            if (!token) return res.json('Token does not exist');
            return res.json('Token removed');
        });
    },

    update: function (req, res) {
        const id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
			user.password = req.body.password ? req.body.password : user.password;
			user.email = req.body.email ? req.body.email : user.email;
			user.name = req.body.name ? req.body.name : user.name;
			user.surname = req.body.surname ? req.body.surname : user.surname;
			user.telephone = req.body.telephone ? req.body.telephone : user.telephone;
			user.image_id = req.body.image_id ? req.body.image_id : user.image_id;
			user.orders = req.body.orders ? req.body.orders : user.orders;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    remove: function (req, res) {
        const id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
