function Logout (props){
    async function logout () {
        const res = await fetch('http://localhost:5000/'+props.type+'/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {'auth-token': localStorage.getItem('token')},
        });

        const data = await res.json();
        console.log(data);
        localStorage.removeItem("token");
        window.location.href="/";
    }
    logout();
}

export default Logout;