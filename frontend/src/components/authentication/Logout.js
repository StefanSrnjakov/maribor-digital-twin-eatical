import {useContext} from 'react';
import {AccountContext} from '../../AccountContext';

function Logout() {
    const accountContext = useContext(AccountContext);

    const logout = async function () {
        const data = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('account')).token
            },
            body: JSON.stringify({
                id: JSON.parse(localStorage.getItem('account')).id
            })
        }

        await fetch('http://localhost:5000/user/logout', data);
        accountContext.update(null);
        window.location.href = "/";
    }

    logout();

}

export default Logout;