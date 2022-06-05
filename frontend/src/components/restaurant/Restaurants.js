import {Component} from "react";
import Restaurant from './Restaurant';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './../styles/formStyle.css'
import restaurant from "../admin/restaurant/Restaurant";
import {Button} from "@mui/material";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import {Link} from "react-router-dom";

class Restaurants extends Component {
    constructor(props) {
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
            .then((response) => response.json())
            .then(data => {
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
            .then((response) => response.json())
            .then(data => {
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

    closer(restaurant) {
        this.setState({
            centerLat: parseFloat(restaurant[0].location.coordinates[0]),
            centerLng: parseFloat(restaurant[0].location.coordinates[1]),
            zoom: 20,
            viewRestaurant: restaurant[0]._id
        });
    }


    render() {
        return (
            <div className="container-lg" style={{maxWidth: "100%", position: "fixed"}}>
                <div className="row">
                    <div className="col-3 d-flex flex-column flex-shrink-0 p-3 bg-light"
                         style={{border: "1px solid black", maxWidth: "30%", maxHeight: "730px"}}>
                        <div className="sidebar-heading"><h3>Restaurants</h3></div>
                        <span>
                            {
                                this.state.showAll ?
                                    <button type="button" className="btn purple" name="all" id="all" onClick={this.componentDidMount.bind(this)}>All</button>
                                    :
                                    <button type="button" className="btn yellow" name="all" id="all" onClick={this.componentDidMount.bind(this)}>All</button>
                            }
                            <>  </>
                            {
                                this.state.showNearby ?
                                    <button type="button" className="btn purple" name="nearby" id="nearby" onClick={this.fetchNearby.bind(this)}>Nearby</button>
                                    :
                                    <button type="button" className="btn yellow" name="nearby" id="nearby" onClick={this.fetchNearby.bind(this)}>Nearby</button>
                            }
                        </span>
                        <div className="list-group list-group-flush overflow-auto vh-100" style={{textAlign: "left"}}>
                        <span>
                            {this.state.restaurants.map(restaurant => (
                                <div key={restaurant._id}>
                                    <Restaurant closer={() => (this.closer.bind(this, [restaurant]))}
                                                restaurant={restaurant}></Restaurant>
                                    {
                                        this.state.viewRestaurant === restaurant._id ?
                                            <div style={{
                                                zIndex: "9",
                                                backgroundColor: "white",
                                                position: "fixed",
                                                left: "30%",
                                                top: "20%",
                                                borderTopLeftRadius: "15px",
                                                borderTopRightRadius: "15px",
                                                width: "300px"
                                            }}>
                                                <div style={{
                                                    backgroundColor: "#63458A",
                                                    paddingLeft: "12px",
                                                    color: "white",
                                                    fontSize: "22px",
                                                    borderTopLeftRadius: "15px",
                                                    borderTopRightRadius: "15px"
                                                }}>{restaurant.name}</div>
                                                {
                                                    restaurant.image_id ? <div><img
                                                        style={{
                                                            width: "300px",
                                                            height: "200px",
                                                            objectFit: "cover"
                                                        }}
                                                        src={"http://localhost:5000/" + restaurant.image_id.path}></img>
                                                    </div> : <></>
                                                }
                                                <div style={{padding:"12px"}}>

                                                    {
                                                        restaurant.address ?
                                                            <div className="row">
                                                                <div className="col-2"
                                                                     style={{verticalAling: "center"}}>
                                                                <span>
                                                                    <HomeIcon fontSize="large"
                                                                              style={{color: "#E3B23C"}}/>
                                                                </span>
                                                                </div>
                                                                <div className="col"><span
                                                                    style={{fontSize: "17px"}}>{restaurant.address}
                                                    </span>
                                                                </div>
                                                            </div> : <></>}

                                                    {
                                                        restaurant.google_rating ?
                                                            <div className="row">
                                                                <div className="col-2"
                                                                     style={{verticalAling: "center"}}>
                                                                <span>
                                                                    <StarOutlineIcon fontSize="large"
                                                                                     style={{color: "#E3B23C"}}/>
                                                                </span>
                                                                </div>
                                                                <div className="col"><span
                                                                    style={{fontSize: "17px"}}>{restaurant.google_rating}</span><br/>
                                                                </div>
                                                            </div> : <></>
                                                    }
                                                    {
                                                        restaurant.opening_hours ?
                                                            <div className="row">
                                                                <div className="col-2"
                                                                     style={{verticalAling: "center"}}>
                                                                <span>
                                                                    <QueryBuilderIcon fontSize="large"
                                                                                      style={{color: "#E3B23C"}}/>
                                                                </span>
                                                                </div>
                                                                <div className="col">
                                                                <span
                                                                    style={{fontSize: "17px"}}> {restaurant.opening_hours}</span><br/>
                                                                </div>
                                                            </div> : <></>}
                                                    {
                                                        restaurant.website ?
                                                            <div className="row">
                                                                <div className="col-2"
                                                                     style={{verticalAling: "center"}}>
                                                                <span>
                                                                    <LanguageIcon fontSize="large"
                                                                                  style={{color: "#E3B23C"}}/>
                                                                </span>
                                                                </div>
                                                                <div className="col">
                                                                <span
                                                                    style={{fontSize: "17px"}}>{restaurant.website}</span><br/>
                                                                </div>
                                                            </div> : <></>}
                                                    {
                                                        restaurant.email ?
                                                            <div className="row">
                                                                <div className="col-2"
                                                                     style={{verticalAling: "center"}}>
                                                                <span>
                                                                    <MarkEmailReadIcon fontSize="large"
                                                                                       style={{color: "#E3B23C"}}/>
                                                                </span>
                                                                </div>
                                                                <div className="col">
                                                                <span
                                                                    style={{fontSize: "17px"}}>{restaurant.email}</span><br/>
                                                                </div>
                                                            </div> : <></>}
                                                    {
                                                        restaurant.telephone ?
                                                            <div className="row">
                                                                <div className="col-2"
                                                                     style={{verticalAling: "center"}}>
                                                                <span>
                                                                    <CallIcon fontSize="large"
                                                                              style={{color: "#E3B23C"}}/>
                                                                </span>
                                                                </div>
                                                                <div className="col">
                                                            <span
                                                                style={{fontSize: "17px"}}>{restaurant.telephone}</span><br/>
                                                                </div>
                                                            </div> : <></>
                                                    }
                                                    {
                                                        restaurant.orders.length > 0 ?
                                                            <Link className="nav-link"
                                                                  to={'/user/restaurant/' + restaurant._id}><Button
                                                                style={{color: "#63458A"}}>Order
                                                                now</Button></Link> : <></>
                                                    }
                                                </div>
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
                    <div className="col-lg-auto">
                        <Map
                            google={this.props.google}
                            zoom={this.state.zoom}
                            initialCenter={{lat: this.state.centerLat, lng: this.state.centerLng}}
                            center={{lat: this.state.centerLat, lng: this.state.centerLng}}
                        >
                            {
                                this.state.restaurants.map(restaurant => (
                                    <Marker title={restaurant.name} name={restaurant.name} key={restaurant._id}
                                            position={{
                                                lat: restaurant.location.coordinates[0],
                                                lng: restaurant.location.coordinates[1]
                                            }}
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