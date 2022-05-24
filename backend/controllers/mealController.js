const MealModel = require('../models/mealModel.js');
const RestaurantModel = require('../models/restaurantModel');

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
        var restaurantId = "627d31fa1936178d5ada0cde";  //TODO
        // mora da se smene
        const meal = new MealModel({
            name: req.body.name,
            allergens: req.body.allergens,
            category: req.body.category,
            price: req.body.price,
            restaurant_id: restaurantId,
            size: req.body.size
        });

        meal.save(function (err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating meal',
                    error: err
                });
            }

            RestaurantModel.findById(restaurantId, function (err, restaurant) {
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

        MealModel.findByIdAndRemove(id, function (err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the meal.',
                    error: err
                });
            }
            RestaurantModel.findById(meal.restaurant_id, function (err, restaurant){
                if(err){
                    return res.status(500).json({
                        message: 'Error when deleting the meal.',
                        error: err
                    });
                }
                if(!restaurant){
                    return res.status(500).json({
                        message: 'Error when deleting the meal.',
                        error: err
                    });
                }

                const index = restaurant.meals.indexOf(meal._id);
                if (index > -1) {
                    restaurant.meals.splice(index, 1); // 2nd parameter means remove one item only
                    restaurant.save();
                }
            })

            return res.status(204).json();
        });
    }
};
