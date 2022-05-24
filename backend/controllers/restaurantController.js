const RestaurantModel = require('../models/restaurantModel.js');
const bcrypt = require("bcryptjs");
const TokenModel = require("../models/tokenModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = {

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

    show: function (req, res) {
        const id = req.params.id;

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

    create: function (req, res) {

    const restaurant = new RestaurantModel({
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
          location: req.body.location,
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

    login: async function (req, res){
        //Check if the username is in the database
        const restaurant = await RestaurantModel.findOne({username: req.body.username});
        if(!restaurant) return res.status(400).json({error: 'Username does not exists'});

        // //Check if password is correct
        // const validPassword = await bcrypt.compare(req.body.password, restaurant.password);
        // if(!validPassword) return res.status(400).json({error: 'Invalid password'});

        //Create and assign a token
        const token = new TokenModel({
            user_id: restaurant._id,
            type: 'restaurant'
        });

        const result = jwt.sign({user_id: restaurant._id, type: 'restaurant'}, process.env.ACCESS_TOKEN_SECRET)

        //Insert token in database
        token.save(function (err) {
            if (err) res.status(500).json({error: 'Token failed to save'});
            return res.header('auth-token', result).json({token: result})
        });
    },

    logout: async function (req, res) {
        TokenModel.findOneAndRemove({user_id: req.header('auth-token')}, function(err){
            if (err) return res.status(500).json('Token failed to remove');
            return res.json('Token removed');
        });
    },

    update: function (req, res) {
        const id = req.params.id;

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
            restaurant.location = req.body.location ? req.body.location : restaurant.location;
            restaurant.ratings = req.body.ratings ? req.body.ratings : restaurant.ratings;

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

    remove: function (req, res) {
        const id = req.params.id;

        RestaurantModel.findByIdAndRemove(id, function (err) {
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
    },

    update_from_api: async function (req, res) {
        let apiUrl = 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=Maribor%2C+Slovenia&q=restaurant&start=0&tbm=lcl&api_key=4f8cb83d8bde30b3b6f339698dbef93339509f29a5358dcd67ea7cc250ba5dbd';
        let run = true;

        try{
            while(run){
                await axios.get(apiUrl).then(response => {
                    const restaurants = response.data.local_results;

                    for (let i = 0; i < restaurants.length; i++) {
                        RestaurantModel.findOne({place_id: restaurants[i].place_id}, function (err, restaurant) {
                            if (err) return res.status(400).send("Error while finding restaurant in database");

                            if (!restaurant) {
                                const newRestaurant = new RestaurantModel({
                                    name: restaurants[i].title,
                                    place_id: restaurants[i].place_id,
                                    google_rating: restaurants[i].rating,
                                    address: restaurants[i].address,
                                    opening_hours: restaurants[i].opening_hours,
                                    location: {
                                        type: "Point",
                                        coordinates: [restaurants[i].gps_coordinates.latitude, restaurants[i].gps_coordinates.longitude]
                                    }
                                });

                                newRestaurant.save(function (err) {
                                    if (err) {
                                        return res.status(500).send("Error when creating restaurant");
                                    }
                                });
                            } else {
                                restaurant.name = restaurants[i].title ? restaurants[i].title : restaurant.name;
                                restaurant.address = restaurants[i].address ? restaurants[i].address : restaurant.address;
                                restaurant.opening_hours = restaurants[i].opening_hours ? restaurants[i].opening_hours : restaurant.opening_hours;
                                restaurant.place_id = restaurants[i].place_id ? restaurants[i].place_id : restaurant.place_id;
                                restaurant.google_rating = restaurants[i].rating ? restaurants[i].rating : restaurant.google_rating;
                                if(restaurants[i].gps_coordinates){
                                    restaurant.location = {
                                        type: "Point",
                                        coordinates: [restaurants[i].gps_coordinates.latitude, restaurants[i].gps_coordinates.longitude]
                                    }
                                }
                            }
                        });
                    }

                    if (response.data.serpapi_pagination.next)
                        apiUrl = response.data.serpapi_pagination.next_link + "&api_key=4f8cb83d8bde30b3b6f339698dbef93339509f29a5358dcd67ea7cc250ba5dbd";
                    else
                        run=false;

                });
            }
            return res.send("Restaurants updated");

        }catch (err){
            return res.status(400).send(err);
        }
    }
};
