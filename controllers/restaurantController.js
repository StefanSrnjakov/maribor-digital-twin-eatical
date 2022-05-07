var RestaurantModel = require('../models/restaurantModel.js');

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
			password : req.body.password,
			orders : req.body.orders,
			image_id : req.body.image_id,
			meals : req.body.meals
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

            restaurant.password = req.body.password ? req.body.password : restaurant.password;
			restaurant.orders = req.body.orders ? req.body.orders : restaurant.orders;
			restaurant.image_id = req.body.image_id ? req.body.image_id : restaurant.image_id;
			restaurant.meals = req.body.meals ? req.body.meals : restaurant.meals;
			
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
    }
};
