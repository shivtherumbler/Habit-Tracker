const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('No token provided'); // Debugging log
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { userId: decoded.userId }; // Attach userId to req.user
        console.log('Decoded token:', decoded); // Debugging log
        console.log('Authenticated user:', req.user); // Debugging log
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = { authenticate };