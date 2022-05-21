const jwt = require('jsonwebtoken')

//Authenticate user or admin
const authenticateUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) return res.status(400).send('Invalid Token')
        else if(token.type !== 'user' && token.type !== 'admin') return res.status(401).send('Access Denied')
        req.token = token;
        next();
    });
}

//Authenticate restaurant or admin
const authenticateRestaurant = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) return res.status(400).send('Invalid Token')
        else if(token.type !== 'restaurant' && token.type !== 'admin') return res.status(401).send('Access Denied')
        req.token = token;
        next();
    });
}

//Authenticate admin
const authenticateAdmin = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) return res.status(400).send('Invalid Token')
        else if(token.type !== 'admin') return res.status(401).send('Access Denied')
        req.token = token;
        next();
    });
}

module.exports.authenticateUser = authenticateUser;
module.exports.authenticateRestaurant = authenticateRestaurant;
module.exports.authenticateAdmin = authenticateAdmin;

