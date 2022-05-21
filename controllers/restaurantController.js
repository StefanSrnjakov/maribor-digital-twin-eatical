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
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            email: req.body.email,
            telephone: req.body.telephone,
            website: req.body.website,
            orders: [],
            image_id: req.body.image_id,
            meals: [],
            place_id: req.body.place_id,
            google_rating: req.body.google_rating,
            location: req.body.location,
            ratings: []
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

    login: async function (req, res) {
        //Check if the username is in the database
        const restaurant = await RestaurantModel.findOne({username: req.body.username});
        if (!user) return res.status(400).send('Username does not exists');

        //Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, restaurant.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        //Create and assign a token
        const token = new TokenModel({
            user_id: restaurant._id,
            type: 'restaurant'
        });

        const result = jwt.sign({user_id: user._id, type: 'restaurant'}, process.env.ACCESS_TOKEN_SECRET)

        //Insert token in database
        token.save(function (err) {
            if (err) res.status(500).send('Token failed to save');
            return res.header('auth-token', result).send(result)
        });
    },

    logout: async function (req, res) {
        TokenModel.findOneAndRemove({user_id: req.token.user_id}, function (err) {
            if (err) return res.status(500).send('Token failed to remove');
            return res.send('Token removed');
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

    list_nearby: function (req, res) {
        RestaurantModel.find({
            location:
                {
                    $near:
                        {
                            $geometry: {type: "Point", coordinates: [46.5547, 15.6459]},
                            $maxDistance: 500
                        }
                }
        }, function (err, restaurants) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurants.',
                    error: err
                });
            }

            return res.json(restaurants);
        });
    },

    rate: function (req, res) {
        RestaurantModel.findByIdAndUpdate(req.params.id, {$push: {ratings: req.body.rating}}, function (err, restaurant) {
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

        let apiUrl = 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=Maribor%2C+Slovenia&q=restaurant&start=0&tbm=lcl&api_key=8566701a4820a02d60bbec839d8d0c57fe3e789f43a1f0b53af7e841f16ba877';
        let run = true;

        try {
            while (run) {
                await axios.get(apiUrl).then(async response => {
                    const restaurants = response.data.local_results;
                    for (let i = 0; i < restaurants.length; i++) {

                        await axios.get(restaurants[i].place_id_search + "&api_key=8566701a4820a02d60bbec839d8d0c57fe3e789f43a1f0b53af7e841f16ba877").then(response2 => {

                            if (response2.data.local_results) {
                                var restaurantMoreInfo = response2.data.local_results[0]
                                RestaurantModel.findOne({place_id: restaurantMoreInfo.place_id}, function (err, restaurant) {
                                    if (err) return res.status(400).send("Error while finding restaurant in database");

                                    if (!restaurant) {
                                        const newRestaurant = new RestaurantModel({
                                            name: restaurantMoreInfo.title,
                                            place_id: restaurantMoreInfo.place_id,
                                            google_rating: restaurantMoreInfo.rating,
                                            address: restaurantMoreInfo.address,
                                            opening_hours: restaurantMoreInfo.opening_hours,
                                            // website: restaurantMoreInfo.links.website ? restaurantMoreInfo.links.website : " ",
                                            // directions_link: restaurantMoreInfo.links.directions ? restaurantMoreInfo.links.directions : " ",
                                            location: {
                                                type: "Point",
                                                coordinates: [restaurantMoreInfo.gps_coordinates.latitude, restaurantMoreInfo.gps_coordinates.longitude]
                                            }
                                        });
                                        newRestaurant.save(function (err) {
                                            if (err) {
                                                return res.status(500).send("Error when creating restaurant");
                                            }
                                        });
                                    } else {
                                        restaurant.name = restaurantMoreInfo.title ? restaurantMoreInfo.title : restaurant.name;
                                        restaurant.address = restaurantMoreInfo.address ? restaurantMoreInfo.address : restaurant.address;
                                        restaurant.opening_hours = restaurantMoreInfo.opening_hours ? restaurantMoreInfo.opening_hours : restaurant.opening_hours;
                                        restaurant.place_id = restaurantMoreInfo.place_id ? restaurantMoreInfo.place_id : restaurant.place_id;
                                        restaurant.google_rating = restaurantMoreInfo.rating ? restaurantMoreInfo.rating : restaurant.google_rating;
                                        // restaurant.website = response2.data.local_results[0].links.website ? response2.data.local_results[0].links.website : restaurant.website;
                                        // restaurant.directions_link = restaurantMoreInfo.links.directions ? restaurantMoreInfo.links.directions : restaurant.directions_link;
                                        if (restaurantMoreInfo.gps_coordinates) {
                                            restaurant.location = {
                                                type: "Point",
                                                coordinates: [restaurantMoreInfo.gps_coordinates.latitude, restaurantMoreInfo.gps_coordinates.longitude]
                                            }
                                        }
                                        restaurant.save(function (err) {
                                            if (err) {
                                                return res.status(500).send("Error when creating restaurant");
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    }

                    if (response.data.serpapi_pagination.next)
                        apiUrl = response.data.serpapi_pagination.next_link + "&api_key=8566701a4820a02d60bbec839d8d0c57fe3e789f43a1f0b53af7e841f16ba877";
                    else
                        run = false;

                });
            }
            return res.send("Restaurants updated");

        } catch (err) {
            console.log(err)
            return res.status(400).send(err);
        }
    }
};
