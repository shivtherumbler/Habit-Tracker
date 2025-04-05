const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret in production

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info to the request
        next();
    } catch (err) {
        console.error('Invalid token:', err);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateToken;