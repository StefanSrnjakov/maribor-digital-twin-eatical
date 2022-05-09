const axios = require("axios");
const RestaurantModel = require("./models/restaurantModel");

function updateRestaurants(apiUrl) {
    axios.get(apiUrl)
        .then(response => {
            var restaurants = response.data.local_results
            for (let i = 0; i < restaurants.length; i++) {
                var RestaurantModel = require('../maribor-digital-twin/models/restaurantModel')
                RestaurantModel.findOne({place_id: restaurants[i].place_id}, function (err, restaurant) {
                    if (err) {
                        console.log("Error while updateing db from api")
                    }
                    if (!restaurant) {
                        var newRestaurant = new RestaurantModel({
                            name: restaurants[i].title,
                            place_id: restaurants[i].place_id,
                            google_rating: restaurants[i].rating,
                            address: restaurants[i].address,
                            opening_hours: restaurants[i].opening_hours,
                            location: {
                                "type": "Point",
                                "coordinates": [restaurants[i].gps_coordinates.latitude, restaurants[i].gps_coordinates.longitude]
                            }
                            // restaurants[i].gps_coordinates.latitude
                            //  restaurants[i].gps_coordinates.longitude
                        });
                        newRestaurant.save();
                    } else {
                        restaurant.name = restaurants[i].title
                        restaurant.place_id = restaurants[i].place_id
                        restaurant.google_rating = restaurants[i].rating
                        restaurant.address = restaurants[i].address
                        restaurant.opening_hours = restaurants[i].opening_hours
                        // restaurant.location = {
                        //     "type": "Point",
                        //     "coordinates": [restaurants[i].gps_coordinates.latitude, restaurants[i].gps_coordinates.longitude]
                        // }
                        restaurant.save()
                    }
                });
            }
            if (response.data.serpapi_pagination.next_link) {

                updateRestaurants(response.data.serpapi_pagination.next_link + "&api_key=4f8cb83d8bde30b3b6f339698dbef93339509f29a5358dcd67ea7cc250ba5dbd")
            }

        })
        .catch(error => {
            console.log(error);
        });
}

function restaurantUpdate() {

    var apiUrl = 'https://serpapi.com/search.json' +
        '?api_key=4f8cb83d8bde30b3b6f339698dbef93339509f29a5358dcd67ea7cc250ba5dbd' +
        '&q=restaurant' +
        '&location=Maribor, Slovenia' +
        '&tbm=lcl&type=restaurant' +
        '&start=0'
    updateRestaurants(apiUrl);

    setTimeout(() => {
        restaurantUpdate()
    }, 30000)

}

module.exports.restaurantUpdate = restaurantUpdate;