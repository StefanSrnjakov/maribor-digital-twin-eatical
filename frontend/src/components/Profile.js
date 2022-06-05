import {AccountContext} from "../AccountContext";
import React from "react";

function Profile() {
    return (
        <div className="container" style={{backgroundColor: "white", padding: "20px", marginTop: "30px", borderRadius: "10px"}}>
            <div className="container-md">
            <h2>Profile</h2>

            <AccountContext.Consumer>
                {context => (
                    <>
                        {context.account.user &&
                            <>
                                <p><b>Name: </b>{context.account.user.name}</p>
                                <p><b>Surname: </b>{context.account.user.surname}</p>
                                <p><b>Email: </b>{context.account.user.email}</p>
                                <p><b>Username: </b>{context.account.user.username}</p>
                                <p><b>Telephone: </b>{context.account.user.telephone}</p>
                                <p><b>Number of orders: </b>{context.account.user.orders.length}</p>
                            </>
                        }
                        {context.account.restaurant &&
                            <>
                                <p><b>Name: </b>{context.account.restaurant.name}</p>
                                <p><b>Address: </b>{context.account.restaurant.address}</p>
                                <p><b>Google rating: </b>{context.account.restaurant.google_rating}</p>
                                <p><b>Username: </b>{context.account.restaurant.username}</p>
                                <p><b>Number of meals: </b>{context.account.restaurant.meals.length}</p>
                                <p><b>Number of orders: </b>{context.account.restaurant.orders.length}</p>
                            </>
                        }
                    </>
                )}
            </AccountContext.Consumer>
            </div>
        </div>
    )


}

export default Profile;