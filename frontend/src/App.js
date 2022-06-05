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
import AdminUsers from "./components/admin/user/Users";
import EditUser from "./components/admin/user/Edit";
import AdminRestaurants from "./components/admin/restaurant/Restaurants";
import ActiveOrders from "./components/users/ActiveOrders";

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
                        <Route exact path={"/admin/users"} element={<AdminUsers/>}></Route>
                        <Route exact path={"/admin/users/edit/:id"} element={<EditUser />}></Route>
                        <Route exact path={"/admin/restaurants"} element={<AdminRestaurants />}></Route>
                        <Route path="/restaurant" exact element={<Restaurants />}></Route>
                        <Route path="/restaurant/meals" exact element={<Meals/>}></Route>
                        <Route path="/restaurant/orders" exact element={<Orders/>}></Route>
                        <Route path="/user/orders" exact element={<MyOrders/>}></Route>
                        <Route path="/user/restaurant/:id" exact element={<ActiveOrders/>}></Route>
                    </Routes>
                </div>
            </AccountContext.Provider>
        </BrowserRouter>

    );
}

export default App;