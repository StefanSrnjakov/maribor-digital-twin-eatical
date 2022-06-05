import {useState} from "react";
import restaurant from "../admin/restaurant/Restaurant";

function Restaurant(props) {

    function rating() {
        if (props.restaurant.google_rating === 0)
            return (
                <span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating >= 0.2 && props.restaurant.google_rating <= 0.8)
            return (
                <span>
                    <span className="fa fa-star-half-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating <= 1)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating >= 1.2 && props.restaurant.google_rating <= 1.8)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star-half-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating <= 2)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating >= 2.2 && props.restaurant.google_rating <= 2.8)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star-half-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating <= 3)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating >= 3.2 && props.restaurant.google_rating <= 3.8)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star-half-o" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating <= 4)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating >= 4.2 && props.restaurant.google_rating <= 4.8)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star-half-o" style={{color: "orange"}}></span>
                </span>
            );
        else if (props.restaurant.google_rating <= 5)
            return (
                <span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                    <span className="fa fa-star" style={{color: "orange"}}></span>
                </span>
            );
    }

    const [aStyle, setAStyle] = useState({color: "black"});

    return (
        <div className="container" key={props.key}>
            <div className="row">
                <div className="col-8" style={{textAlign: "left"}}>
                    <span
                        style={aStyle}
                        onMouseOver={() => setAStyle({color: "red", cursor: "pointer"})}
                        onMouseLeave={() => setAStyle({color: "black"})}
                        onClick={props.closer()}
                    >
                        {props.restaurant.name}
                    </span>
                    <br></br>
                    <span><span style={{fontSize: "12px"}}>{props.restaurant.google_rating}  </span>{rating()}</span>
                </div>
                <div className="col-4" style={{textAlign: "right"}}>
                    {props.restaurant.image_id && <img
                        style={{width: "100px", height: "100px", objectFit:"cover"}}
                        src={"http://localhost:5000/" + props.restaurant.image_id.path}></img>}
                </div>
            </div>
        </div>
    );
}

export default Restaurant;