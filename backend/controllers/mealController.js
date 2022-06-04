const MealModel = require('../models/mealModel.js');
const RestaurantModel = require('../models/restaurantModel.js');

module.exports = {

    list: function (req, res) {
        MealModel.find(function (err, meals) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting meal.',
                    error: err
                });
            }

            return res.json(meals);
        });
    },

    show: function (req, res) {
        const id = req.params.id;

        MealModel.findOne({_id: id}, function (err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting meal.',
                    error: err
                });
            }

            if (!meal) {
                return res.status(404).json({
                    message: 'No such meal'
                });
            }

            return res.json(meal);
        });
    },

    create: function (req, res) {
        const meal = new MealModel({
            name: req.body.name,
            allergens: req.body.allergens,
            category: req.body.category,
            price: req.body.price,
            restaurant_id: req.body.restaurant_id,
            size: req.body.size,
            is_deleted: false
        });

        meal.save(function (err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating meal',
                    error: err
                });
            }

            RestaurantModel.findById(req.body.restaurant_id, function (err, restaurant) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating meal',
                        error: err
                    });
                }
                restaurant.meals.push(meal._id);
                restaurant.save(function (err, meal) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating meal.',
                            error: err
                        });
                    }

                    return res.json(meal);
                });
            });
        });
    },

    update: function (req, res) {
        const id = req.params.id;

        MealModel.findOne({_id: id}, function (err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting meal',
                    error: err
                });
            }

            if (!meal) {
                return res.status(404).json({
                    message: 'No such meal'
                });
            }

            meal.name = req.body.name ? req.body.name : meal.name;
            meal.allergens = req.body.allergens ? req.body.allergens : meal.allergens;
            meal.category = req.body.category ? req.body.category : meal.category;
            meal.price = req.body.price ? req.body.price : meal.price;
            meal.restaurant_id = req.body.restaurant_id ? req.body.restaurant_id : meal.restaurant_id;
            meal.size = req.body.size ? req.body.size : meal.size;

            meal.save(function (err, meal) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating meal.',
                        error: err
                    });
                }

                return res.json(meal);
            });
        });
    },

    remove: function (req, res) {
        const id = req.params.id;

        MealModel.findById(id, function (err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the meal.',
                    error: err
                });
            }
            meal.is_deleted = true;
            meal.save(function (err, meal) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating meal.',
                        error: err
                    });
                }
                return res.status(204).json();
            });
        });
    }
};
