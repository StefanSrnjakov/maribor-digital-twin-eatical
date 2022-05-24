import {useContext} from "react";
// import {UserContext} from "../userContext";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="nav-item nav-link" to='/'>Home</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                    <Link className="nav-item nav-link" to='/restaurant/meal/627d31fa1936178d5ada0cde'>restaurant my meals</Link>{/*TODO*/}
                    <Link className="nav-item nav-link" to='/restaurant/order/627d31fa1936178d5ada0cde'>restaurant my order</Link>{/*TODO*/}
                    <Link className="nav-item nav-link" to='/user/my_order/6277b83d41f0e38fbf7e6c87'>user my order</Link>{/*TODO*/}

                {/*TODO*/}
                </div>

            </nav>
        </header>
    );
}

export default Header;