const RestaurantModel = require('../models/restaurantModel.js');
const ImageModel = require('../models/imageModel.js');
const bcrypt = require("bcryptjs");
const TokenModel = require("../models/tokenModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const {error} = require("@hapi/joi/lib/annotate");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const {response} = require("express");
const request = require("request");
const fs = require("fs");

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
        RestaurantModel.findOne({_id: id})
            .populate({
                path: 'meals',
                populate: {
                    path: 'category'
                }
            })
            .populate({
                path: 'meals',
                populate: {
                    path: 'allergens'
                }
            })
            .populate({
                path: 'orders',
                options: { sort: { 'pick_up_time': -1 } },
                populate: {
                    path: 'meal_id',
                    populate: {
                        path: "allergens"
                    }
                }
            })
            .populate({
                path: 'orders',
                options: { sort: { 'pick_up_time': -1 } },
                populate: {
                    path: 'meal_id',
                    populate: {
                        path: "category"
                    }
                }
            })
            .populate({
                path: 'orders',
                options: { sort: { 'pick_up_time': -1 } },
                populate: {
                    path: 'user_id',
                }
            })
            .exec(function (err, restaurant) {
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
        if(!restaurant) return res.status(400).json({error: 'Username does not exists'});

        // //Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, restaurant.password);
        console.log(validPassword)
        console.log(req.body.password)
        console.log(restaurant.password)
        if(!validPassword) return res.status(400).json({error: 'Invalid password'});

        //Create and assign a token
        const token = new TokenModel({
            user_id: restaurant._id,
            type: 'restaurant'
        });

        const result = jwt.sign({user_id: restaurant._id, type: 'restaurant'}, process.env.ACCESS_TOKEN_SECRET)

        //Insert token in database
        token.save(function (err, mongoToken) {
            if (err) res.status(500).json({error: 'Token failed to save'});
            return res.header('auth-token', result).json({id: mongoToken._id, token: result, restaurant: restaurant});
        });
    },

    logout: async function (req, res) {
        console.log(req.body.id)

        TokenModel.findByIdAndRemove(req.body.id, function(err, token){
            console.log(token)
            if (err) return res.status(500).json('Token failed to remove');
            if (!token) res.json('Token does not exist');
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

    list_nearby: function(req, res) {
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

    refreshRestaurants: async function (req, res) {

        puppeteer.use(StealthPlugin());

        var url = "https://www.tripadvisor.com/Restaurants-g274874-oa1-Maribor_Styria_Region.html";

        var detailedRestaurantsUrl = [];

        await puppeteer.launch({headless: true}).then(async browser => {
            const page = await browser.newPage();
            for (let counter = 1; counter <= 5; counter++) {
                await page.goto(url);
                await page.waitForTimeout(500)
                const html = await page.content();
                let $ = cheerio.load(html);

                await $('.OhCyu').each(function (i, e) {
                    var spanElement = $(this).children().first().get(0);
                    detailedRestaurantsUrl.push(spanElement.children[0].attribs.href);
                })
                url = "https://www.tripadvisor.com/Restaurants-g274874-oa" + (counter * 30) + "-Maribor_Styria_Region.html#EATERY_LIST_CONTENTS";
            }


            for (let i = 0; i < detailedRestaurantsUrl.length; i++) {
                await page.goto("https://www.tripadvisor.com" + detailedRestaurantsUrl[i]);
                await page.waitForTimeout(1000)
                const html = await page.content();
                let $ = cheerio.load(html);


                var restaurant = {};

                var basicData = $('.ftaPK')[0];
                restaurant.name = $('.fHibz')[0]?.children[0].data;
                restaurant.address = basicData.children[2]?.children[0]?.children[0]?.children[0]?.next.children[0]?.data;
                restaurant.telephone = basicData.children[2]?.children[1]?.children[0]?.children[1]?.children[0]?.children[0]?.data;
                restaurant.website = basicData.children[2]?.children[2]?.children[0]?.children[1]?.attribs.href;


                restaurant.opening_hours = $('.dyeJW.bcYVS').contents() ? $('.dyeJW.bcYVS').contents() : "";

                var coordinatesImageLink = $('.eCPON.w.MD._S')[0].attribs.src;
                var coordinates = /\|([+-]?[0-9]*[.][0-9]+),([+-]?[0-9]*[.][0-9]+)/.exec(coordinatesImageLink);
                var coordinate1 = coordinates[1];
                var coordinate2 = coordinates[2];

                restaurant.location = {
                    type: "Point",
                    coordinates: [coordinate1, coordinate2]
                }
                restaurant.ratings = [];
                restaurant.google_rating = $(".fdsdx")[0]?.children[0]?.data;

                var email = $(".bKBJS.Me.enBrh")[1]?.children[0]?.children[0]?.attribs.href ? $(".bKBJS.Me.enBrh")[1]?.children[0]?.children[0]?.attribs.href : "";
                if (email !== "") restaurant.email = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.exec(email)[0];


                var imgExists = true;
                var imgAddress = "";
                try {
                    imgAddress = $('.prw_rup.prw_common_basic_image.photo_widget.large.landscape')[0].children[0].children[1].attribs["data-lazyurl"];
                } catch (err) {
                    imgExists = false;
                }
                if (imgExists) {
                    var localImgPath = "/public/images/" + i + /\/([\w|\.|-]*)$/.exec(imgAddress)[1];


                    var download = function (uri, filename, callback) {
                        request.head(uri, function (err, res, body) {
                            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                        });
                    };

                    download(imgAddress, "." + localImgPath, function () {
                        console.log('image saved');
                    });

                    await ImageModel.findOne({path: localImgPath}).exec(async function (err, image) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when getting image.',
                                error: err
                            });
                        }
                        if (!image) {
                            await axios.post("http://localhost:5000/image", {path: localImgPath}).then((response) => {
                                restaurant.image_id = response.data._id;
                            });
                        } else {
                            restaurant.image_id = image._id;
                        }
                    })
                }

                await RestaurantModel.findOne({name: restaurant.name}).exec(function (err, restaurantMongo) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting restaurant.',
                            error: err
                        });
                    }

                    if (!restaurantMongo) {
                        axios.post("http://localhost:5000/restaurant", restaurant).then((response) => {
                            console.log("restaurant saved");
                        }, (error) => {
                            console.log(error);
                        });
                    } else {
                        axios.put("http://localhost:5000/restaurant/" + restaurantMongo._id, restaurant).then((response) => {
                            console.log("restaurant updated");
                        }, (error) => {
                            console.log(error);
                        });
                    }

                });
            }
            browser.close()
        })

        return res.status(201).json();
    }

};
