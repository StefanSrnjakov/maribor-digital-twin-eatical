import {Link} from "react-router-dom";
import {AccountContext} from "../AccountContext";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LoginIcon from '@mui/icons-material/Login';

function Header() {
    return (<header>
        <nav className={"navbar navbar-expand-lg bg-light"}>
            <div className="container-fluid">
                {/*Logo*/}
                <Link className="navbar-brand" to='#'>Eatical</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <AccountContext.Consumer>
                        {context => (<>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {(!context.account || context.account.user) &&
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to='/'>Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to='/restaurants'><RestaurantIcon/>&nbsp;&nbsp;Restaurants</Link>
                                            </li>
                                        </>
                                    }
                                    {context.account && context.account.user &&
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/user/orders'>My Orders</Link>
                                        </li>
                                    }
                                    {context.account && context.account.restaurant && <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/restaurant/meals'>Meals</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/restaurant/orders'>Orders</Link>
                                        </li>
                                    </>}
                                    {context.account && context.account.admin && <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/admin/users'>Users</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link"
                                                  to='/admin/restaurants'>Restaurants</Link>
                                        </li>
                                    </>}
                                </ul>
                                {/*Right nav bar*/}
                                <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                                    {!context.account && <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/login'><LoginIcon/>&nbsp;&nbsp;Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/register'>Register</Link>
                                        </li>
                                    </>}
                                    {context.account && (context.account.user || context.account.restaurant) &&
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/profile'><PersonIcon />&nbsp;&nbsp;Profile</Link>
                                        </li>}
                                    {context.account && (context.account.user || context.account.restaurant || context.account.admin) &&
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/logout'><LogoutIcon /> &nbsp;&nbsp;Log Out</Link>
                                        </li>}
                                </ul>
                            </>
                        )}
                    </AccountContext.Consumer>
                </div>
            </div>
        </nav>
    </header>);
}

export default Header;