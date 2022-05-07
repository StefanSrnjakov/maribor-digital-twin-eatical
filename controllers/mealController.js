var MealModel = require('../models/mealModel.js');

/**
 * mealController.js
 *
 * @description :: Server-side logic for managing meals.
 */
module.exports = {

    /**
     * mealController.list()
     */
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

    /**
     * mealController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

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

    /**
     * mealController.create()
     */
    create: function (req, res) {
        var meal = new MealModel({
			name : req.body.name,
			allergens : req.body.allergens,
			category : req.body.category,
			price : req.body.price,
			restaurant_id : req.body.restaurant_id,
			size : req.body.size
        });

        meal.save(function (err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating meal',
                    error: err
                });
            }

            return res.status(201).json(meal);
        });
    },

    /**
     * mealController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

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

    /**
     * mealController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        MealModel.findByIdAndRemove(id, function (err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the meal.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
