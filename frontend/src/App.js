import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AccountContext} from "./AccountContext";
import Header from "./components/Header";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import Profile from "./components/Profile";
import {useState} from "react";
import Meals from "./components/restaurant/Meals"
import Orders from "./components/restaurant/Orders";
import Restaurants from "./components/restaurant/Restaurants";
import MyOrders from "./components/users/MyOrders";

function App() {

    const [account, setAccount] = useState(localStorage.account ? JSON.parse(localStorage.account) : null);

    const update = (accountInfo) => {
        localStorage.setItem("account", JSON.stringify(accountInfo));
        setAccount(accountInfo);
    }

    return (<BrowserRouter>
            <AccountContext.Provider value={{
                account: account, update: update
            }}>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route exact path={"/"}></Route>
                        <Route exact path={"/login"} element={<Login/>}></Route>
                        <Route exact path={"/register"} element={<Register/>}></Route>
                        <Route exact path={"/logout"} element={<Logout/>}></Route>
                        <Route exact path={"/profile"} element={<Profile/>}></Route>
                        <Route path="/restaurant" exact element={<Restaurants />}></Route>
                        <Route path="/restaurant/meals" exact element={<Meals/>}></Route>{/*TODO id-TO*/}
                        <Route path="/restaurant/orders" exact element={<Orders/>}></Route>{/*TODO id-TO*/}
                        <Route path="/user/orders" exact element={<MyOrders/>}></Route>{/*TODO id-TO*/}
                    </Routes>
                </div>
            </AccountContext.Provider>
        </BrowserRouter>

    );
}

export default App;