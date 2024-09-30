const jwt = require('jsonwebtoken');
const secretKey = 'deku';

const checkToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(500).json({ message: 'Failed to authenticate token.', error: err.message });
        }
        req.user = decoded; 
        next();
    });
};

module.exports = checkToken;
