import {Component} from "react";
import Restaurant from './Restaurant';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class Restaurants extends Component {
    constructor(props){
        super(props);

        this.state = {
            restaurants: [],
            centerLat: 46.557294, //latitude of the center of Maribor
            centerLng: 15.646074, //latitude of the center of Maribor
            zoom: 15,
            showAll: true,
            showNearby: false,
            linkStyle: {textDecoration: "none", color: "black"},
            viewRestaurant: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/restaurant')
            .then((response)=>response.json())
            .then(data=>{
                this.setState({
                    restaurants: data,
                    showAll: true,
                    showNearby: false,
                    centerLat: 46.557294,
                    centerLng: 15.646074,
                    zoom: 15
                });
            });
    }

    fetchNearby() {
        fetch('http://localhost:5000/restaurant/nearby')
            .then((response)=>response.json())
            .then(data=>{
                this.setState({
                    restaurants: data,
                    showNearby: true,
                    showAll: false,
                    centerLat: 46.557294,
                    centerLng: 15.646074,
                    zoom: 15
                });
            });
    }

    closer(restaurant){
        this.setState({
            centerLat: parseFloat(restaurant[0].location.coordinates[0]),
            centerLng: parseFloat(restaurant[0].location.coordinates[1]),
            zoom: 20,
            viewRestaurant: restaurant[0]._id
        });
    }

    render() {
        return (
            <div className="container" style={{width: "80%", position: "fixed"}}>
                <div className="row">
                    <div className="col-3 d-flex flex-column flex-shrink-0 p-3 bg-light" style={{border: "1px solid black", maxWidth: "30%", maxHeight: "730px"}}>
                        <div className="sidebar-heading"><h3>Restaurants</h3></div>
                        <span>
                            {
                                this.state.showAll ?
                                    <button type="button" className="btn btn-info btn-sm" name="all" id="all" onClick={this.componentDidMount.bind(this)}>All</button>
                                    :
                                    <button type="button" className="btn btn-outline-info btn-sm" name="all" id="all" onClick={this.componentDidMount.bind(this)}>All</button>
                            }
                            <>  </>
                            {
                                this.state.showNearby ?
                                    <button type="button" className="btn btn-info btn-sm" name="nearby" id="nearby" onClick={this.fetchNearby.bind(this)}>Nearby</button>
                                    :
                                    <button type="button" className="btn btn-outline-info btn-sm" name="nearby" id="nearby" onClick={this.fetchNearby.bind(this)}>Nearby</button>
                            }
                        </span>
                        <div className="list-group list-group-flush overflow-auto vh-100" style={{textAlign: "left"}}>
                        <span>
                            {this.state.restaurants.map(restaurant => (
                                <div key={restaurant._id}>
                                    <Restaurant closer={() => (this.closer.bind(this,[restaurant]))} restaurant={restaurant}></Restaurant>
                                    {
                                        this.state.viewRestaurant === restaurant._id ?
                                            <div>
                                                <p style={{fontSize: "14px"}}>{restaurant.address}</p>
                                                {/*<a href="#" className="btn btn-primary btn-sm">Order</a> /!*stefan needs to add link in href to a page displaying Restaurant info and active meals*!/*/}
                                            </div>
                                            :
                                            <></>
                                    }
                                    <hr></hr>
                                </div>
                            ))}
                        </span>
                        </div>
                    </div>
                    <div className="col">
                        <Map
                            google={this.props.google}
                            zoom={this.state.zoom}
                            initialCenter={{lat: this.state.centerLat, lng: this.state.centerLng}}
                            center={{lat: this.state.centerLat, lng: this.state.centerLng}}
                        >
                            {
                                this.state.restaurants.map(restaurant => (
                                    <Marker title={restaurant.name} name={restaurant.name} key={restaurant._id}
                                            position={{lat: restaurant.location.coordinates[0], lng: restaurant.location.coordinates[1]}}
                                            label={restaurant.orders.length.toString()}
                                    />
                                ))}
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: (process.env.GOOGLE_MAPS_BILLING_API_KEY)
})(Restaurants);