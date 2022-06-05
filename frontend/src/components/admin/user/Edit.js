import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import '../../styles/formStyle.css'


function EditUser() {
    const { id } = useParams()

    const [user, setUser] = useState([])

    const getUser = async function () {
        const res = await fetch("http://localhost:5000/user/"+id);
        const data = await res.json();
        setUser(data)
        setUsername(data.username)
        setEmail(data.email)
        setTelephone(data.telephone)
        setName(data.name)
        setSurname(data.surname)
    }

    useEffect(function () {
        getUser();

    }, []);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [error, setError] = useState("");




    async function edit(event) {
        event.preventDefault();
        const res = await fetch('http://localhost:5000/user/'+id, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                telephone: telephone,
                name: name,
                surname: surname,
            })
        });

        await res.json();
        window.location.href = "/admin/users";


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
                        <label>Surname</label>
                        <input type={"text"} className={"form-control"} placeholder={"Enter surname"} value={surname}
                               onChange={e => setSurname(e.target.value)}/>
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
                        <input type={"text"} className={"form-control"} placeholder={"Enter telephone"}
                               value={telephone}
                               onChange={e => setTelephone(e.target.value)}/>
                    </div>
                    <input className={"purple btn mt-2"} type="submit" name="submit" value="Edit"/>
                    <label>{error}</label>

                </form>
            </div>
        </div>
    );



}

export default EditUser;