const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret in production

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = { authenticate };