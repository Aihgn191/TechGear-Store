const jwt = require('jsonwebtoken');
const config = require('../config/setting.json');

function verifyToken(req, res, next) {
    const token = req.cookies.token; // Lấy token từ cookie

    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.userData = {
            username: decoded.username,
            roles: decoded.roles || [],
        };
        if (!req.userData.roles.includes('admin')) {
            return res.status(403).json({
                auth: false,
                message: 'Access denied. Admin role required.'
            });
        }
        next();
    } catch (err) {
        return res.status(403).json({ auth: false, message: 'Failed to authenticate token.' });
    }
}

module.exports = verifyToken;