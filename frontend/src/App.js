import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import {useEffect, useState } from "react";

function App (){
    const [user, setUser] = useState('');

    useEffect( function () {
        const authenticate = async function() {
            const res = await fetch('http://localhost:5000/token', {
                method: 'GET',
                credentials: 'include',
                headers: {'auth-token': localStorage.getItem('token')},
            });

            const data = await res.json();
            setUser(data);
        }
        authenticate();
    }, []);


        return (
            <BrowserRouter>
                <div className="App">
                    <Header type={user.type} />
                    <Routes>
                        <Route exact path={"/"} ></Route>
                        <Route exact path={"/login"} element={ <Login /> }></Route>
                        <Route exact path={"/register"} element={ <Register /> }></Route>
                        <Route exact path={"/logout"} element={ <Logout type={user.type} /> }></Route>
                    </Routes>
                </div>
            </BrowserRouter>

        );
}

export default App;