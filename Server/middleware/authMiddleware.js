const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for security

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded token:', decoded); // Debugging log
        req.user = decoded; // Attach user info to the request
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = { authenticate };