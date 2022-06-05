const OrderModel = require('../models/orderModel.js');
const UserModel = require('../models/userModel.js');
const RestaurantModel = require('../models/restaurantModel.js');
const MealModel = require('../models/mealModel.js');

module.exports = {

    list: function (req, res) {
        OrderModel.find().sort({pick_up_time:'desc'}).exec((err, orders) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting order.',
                    error: err
                });
            }

            return res.json(orders);
        });
    },

    show: function (req, res) {
        const id = req.params.id;

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

    create: function (req, res) {
        const order = new OrderModel({
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

    update: function (req, res) {
        const id = req.params.id;

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

    remove: function (req, res) {
        const id = req.params.id;

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

    claim: function (req, res){
        UserModel.findByIdAndUpdate(req.token.user_id, {$push : {orders : req.params.id}}, function(err, user){
            if(err){
                return res.status(500).json({
                    message: 'Error when updating user',
                    error: err
                });
            }
        });
        OrderModel.findByIdAndUpdate(req.params.id, {user_id : req.token.user_id, completed : true}, function(err, order){
            if(err){
                return res.status(500).json({
                    message: 'Error when updating order',
                    error: err
                });
            }
            return res.json(order);
        });
    },

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
