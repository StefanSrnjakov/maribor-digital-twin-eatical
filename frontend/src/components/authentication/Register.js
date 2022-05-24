import React, {useState} from "react";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [error, setError] = useState("");

    async function login(event) {
        event.preventDefault();
        const res = await fetch('http://localhost:5000/user/register', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                telephone: telephone,
                name: name,
                surname: surname,
            })
        });

        const data = await res.json();

        if (data.user !== undefined) {
            window.location.href = "/login";
        } else {
            setPassword("");
            if (data.error !== undefined)
                setError(data.error);
            else
                setError("Unexpected error");
        }
    }

    return (
        <div className="container"
             style={{backgroundColor: "white", padding: "20px", marginTop: "30px", borderRadius: "10px"}}>
            <div className="container-md">
                <h1>Register</h1>
                <form onSubmit={login}>
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
                        <label>Password</label>
                        <input type={"password"} className={"form-control"} placeholder={"Enter password"}
                               value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Telephone</label>
                        <input type={"text"} className={"form-control"} placeholder={"Enter telephone"}
                               value={telephone}
                               onChange={e => setTelephone(e.target.value)}/>
                    </div>
                    <input type="submit" name="submit" value="Register"/>
                    <label>{error}</label>

                </form>
            </div>
        </div>
    );
}

export default Register;