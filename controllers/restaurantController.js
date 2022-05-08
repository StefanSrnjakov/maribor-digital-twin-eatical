var RestaurantModel = require('../models/restaurantModel.js');
const mongoose = require("mongoose");

/**
 * restaurantController.js
 *
 * @description :: Server-side logic for managing restaurants.
 */
module.exports = {

    /**
     * restaurantController.list()
     */
    list: function (req, res) {
        RestaurantModel.find(function (err, restaurants) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurant.',
                    error: err
                });
            }

            return res.json(restaurants);
        });
    },

    /**
     * restaurantController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findOne({_id: id}, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurant.',
                    error: err
                });
            }

            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant'
                });
            }

            return res.json(restaurant);
        });
    },

    /**
     * restaurantController.create()
     */
    create: function (req, res) {
        var restaurant = new RestaurantModel({
            username : req.body.username,
			password : req.body.password,
            name : req.body.name,
            address : req.body.address,
            opening_hours : req.body.opening_hours,
            email : req.body.email,
            telephone : req.body.telephone,
            website : req.body.website,
			orders : [],
			image_id : req.body.image_id,
			meals : [],
            place_id : req.body.place_id,
            google_rating : req.body.google_rating,
            latitude : req.body.latitude,
            longitude : req.body.longitude,
            ratings : []
        });

        restaurant.save(function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating restaurant',
                    error: err
                });
            }

            return res.status(201).json(restaurant);
        });
    },

    /**
     * restaurantController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findOne({_id: id}, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurant',
                    error: err
                });
            }

            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant'
                });
            }

            restaurant.username = req.body.username ? req.body.username : restaurant.username;
            restaurant.password = req.body.password ? req.body.password : restaurant.password;
            restaurant.name = req.body.name ? req.body.name : restaurant.name;
            restaurant.address = req.body.address ? req.body.address : restaurant.address;
            restaurant.opening_hours = req.body.opening_hours ? req.body.opening_hours : restaurant.opening_hours;
            restaurant.email = req.body.email ? req.body.email : restaurant.email;
            restaurant.telephone = req.body.telephone ? req.body.telephone : restaurant.telephone;
            restaurant.website = req.body.website ? req.body.website : restaurant.website;
            restaurant.orders = req.body.orders ? req.body.orders : restaurant.orders;
			restaurant.image_id = req.body.image_id ? req.body.image_id : restaurant.image_id;
			restaurant.meals = req.body.meals ? req.body.meals : restaurant.meals;
            restaurant.place_id = req.body.place_id ? req.body.place_id : restaurant.place_id;
            restaurant.google_rating = req.body.google_rating ? req.body.google_rating : restaurant.google_rating;
            restaurant.latitude = req.body.latitude ? req.body.latitude : restaurant.latitude;
            restaurant.longitude = req.body.longitude ? req.body.longitude : restaurant.longitude;

            restaurant.save(function (err, restaurant) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating restaurant.',
                        error: err
                    });
                }

                return res.json(restaurant);
            });
        });
    },

    /**
     * restaurantController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findByIdAndRemove(id, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the restaurant.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    list_nearby: function(req, res){
        RestaurantModel.find({
            location:
                {
                    $near:
                        {
                            $geometry: { type: "Point", coordinates: [46.5547, 15.6459] },
                            $maxDistance: 500
                        }
                }
        }, function(err, restaurants){
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurants.',
                    error: err
                });
            }

            return res.json(restaurants);
        });
    },

    rate: function(req, res){
        RestaurantModel.findByIdAndUpdate(req.params.id, {$push: {ratings : req.body.rating}}, function(err, restaurant){
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating restaurant.',
                    error: err
                });
            }

            return res.json(restaurant);
        });
    }
};
