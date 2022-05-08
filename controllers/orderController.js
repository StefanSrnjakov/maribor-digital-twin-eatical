var OrderModel = require('../models/orderModel.js');
var UserModel = require('../models/userModel.js');
var RestaurantModel = require('../models/restaurantModel.js');
var MealModel = require('../models/mealModel.js');
/**
 * orderController.js
 *
 * @description :: Server-side logic for managing orders.
 */
module.exports = {

    /**
     * orderController.list()
     */
    list: function (req, res) {
        OrderModel.find(function (err, orders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }

            return res.json(orders);
        });
    },

    /**
     * orderController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        OrderModel.findOne({_id: id}, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }

            if (!order) {
                return res.status(404).json({
                    message: 'No such order'
                });
            }

            return res.json(order);
        });
    },

    /**
     * orderController.create()
     */
    create: function (req, res) {
        var order = new OrderModel({
			pick_up_time : req.body.pick_up_time,
			order_time : req.body.order_time,
			price : req.body.price,
			meal_id : req.body.meal_id,
			user_id : null,
			completed : false
        });

        order.save(function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating order',
                    error: err
                });
            }
            MealModel.findById(req.body.meal_id, function(err, meal){
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting meal',
                        error: err
                    });
                }
                RestaurantModel.findByIdAndUpdate(meal.restaurant_id, {$push : {orders : order._id}}, function(err, restaurant){
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating restaurant',
                            error: err
                        });
                    }
                });
            });
            return res.status(201).json(order);
        });
    },

    /**
     * orderController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        OrderModel.findOne({_id: id}, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order',
                    error: err
                });
            }

            if (!order) {
                return res.status(404).json({
                    message: 'No such order'
                });
            }

            order.pick_up_time = req.body.pick_up_time ? req.body.pick_up_time : order.pick_up_time;
            order.order_time = req.body.order_time ? req.body.order_time : order.order_time;
            order.price = req.body.price ? req.body.price : order.price;
            order.meal_id = req.body.meal_id ? req.body.meal_id : order.meal_id;
            order.user_id = req.body.user_id ? req.body.user_id : order.user_id;
            order.completed = req.body.completed ? req.body.completed : order.completed;

            order.save(function (err, order) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating order.',
                        error: err
                    });
                }

                return res.json(order);
            });
        });
    },

    /**
     * orderController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        OrderModel.findByIdAndRemove(id, function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the order.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    /**
     * orderController.claim()
     */
    claim: function (req, res){
        UserModel.findByIdAndUpdate(req.user._id, {$push : {orders : req.params.id}}, function(err, user){
            if(err){
                return res.status(500).json({
                    message: 'Error when updating user',
                    error: err
                });
            }
        });
        OrderModel.findByIdAndUpdate(req.params.id, {user_id : req.user._id}, function(err, order){
            if(err){
                return res.status(500).json({
                    message: 'Error when updating order',
                    error: err
                });
            }
            return res.json(order);
        });
    },

    /**
     * orderController.complete()
     */
    complete: function(req, res){
        req.body.completed = true;
        OrderModel.findByIdAndUpdate(req.params.id, {completed : true}, function(err, order){
            if(err){
                return res.status(500).json({
                    message: 'Error when updating order',
                    error: err
                });
            }
            return res.json(order);
        });
    }
};
