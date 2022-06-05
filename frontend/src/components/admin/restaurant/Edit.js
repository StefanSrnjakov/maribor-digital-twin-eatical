import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import '../../styles/formStyle.css'

function EditRestaurant() {
    const { id } = useParams()

    const [restaurant, setRestaurant] = useState([])

    const getRestaurant = async function () {
        const res = await fetch("http://localhost:5000/restaurant/"+id);
        const data = await res.json();
        setRestaurant(data)
        setUsername(data.username)
        setEmail(data.email)
        setAddress(data.address)
        setName(data.name)
    }

    useEffect(function () {
        getRestaurant();
    }, []);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");




    async function edit(event) {
        event.preventDefault();
        const res = await fetch('http://localhost:5000/restaurant/'+id, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                address: address,
                name: name,
            })
        });

        await res.json();
        window.location.href = "/admin/restaurants";
    }

    return (
        <div className="container"
             style={{backgroundColor: "white", padding: "20px", marginTop: "30px", borderRadius: "10px"}}>
            <div className="container-md">
                <h1>Edit</h1>
                <form onSubmit={edit}>
                    <div className={"form-group"}>
                        <label>Name</label>
                        <input type={"text"} className={"form-control"} placeholder={"Enter name"} value={name}
                               onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Username</label>
                        <input type={"text"} className={"form-control"} placeholder={"Enter username"} value={username}
                               onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Email</label>
                        <input type={"email"} className={"form-control"} placeholder={"Enter email"} value={email}
                               onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className={"form-group"}>
                        <label>Telephone</label>
                        <input type={"text"} className={"form-control"} placeholder={"Enter address"}
                               value={address}
                               onChange={e => setAddress(e.target.value)}/>
                    </div>
                    <input className={"purple btn mt-2"} type="submit" name="submit" value="Edit"/>
                    <label>{error}</label>

                </form>
            </div>
        </div>
    );



}

export default EditRestaurant;