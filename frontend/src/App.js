import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Meals from "./components/restaurant/Meals"
import Orders from "./components/restaurant/Orders";
import MyOrders from "./components/users/MyOrders";
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header title="My application"></Header>

                <Routes>
                {/*    <Route path="/" exact element={<Photos/>}></Route>TODO*/}
                {/*    <Route path="/users/my_orders" exact element={<MyOrders/>}></Route>TODO*/}
                {/*    <Route path="/restaurant/my_orders" exact element={<MyOrders/>}></Route>TODO*/}
                    <Route path="/restaurant/meal/:id" exact element={<Meals/>}></Route>{/*TODO id-TO*/}
                    <Route path="/restaurant/order/:id" exact element={<Orders/>}></Route>{/*TODO id-TO*/}
                    <Route path="/user/my_order/:id" exact element={<MyOrders/>}></Route>{/*TODO id-TO*/}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
