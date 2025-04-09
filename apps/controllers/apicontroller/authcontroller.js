const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../../config/setting.json');
const verifyToken = require('../../../middleware/verifyToken');
const UserService = require('../../services/userService');

const userService = new UserService();

// Đăng ký người dùng
router.post('/register', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
    }
    const { username, fullname, password, phonenumber, email, address } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const existingUser = await userService.userCollection.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Đã tồn tại' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            fullname: fullname || '',
            password: hashedPassword,
            phonenumber: phonenumber || '',
            email,
            address: address || '',
            role: 'customer'
        };

        const result = await userService.insertUser(newUser);
        if (!result || !result.insertedId) {
            throw new Error('them that bai');
        }
        const token = jwt.sign(
            {
                username,
                phonenumber: phonenumber || '',
                address: address || '',
                roles: [newUser.role]
            },
            config.jwt.secret,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });
        res.json({ message: 'Registration successful' });
    } catch (err) {
        console.error('Error in /register:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Đăng nhập người dùng
router.post('/login', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
    }
    const { loginInput, password, redirectUrl } = req.body;

    if (!loginInput || !password) {
        return res.status(400).json({ message: 'Missing login input or password' });
    }
    try {
        const user = await userService.userCollection.findOne({
            $or: [{ username: loginInput }, { email: loginInput }]
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username/email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username/email or password' });
        }
        const token = jwt.sign(
            { username: user.username, phonenumber: user.phonenumber, address: user.address, roles: [user.role] },
            config.jwt.secret,
            { expiresIn: '1h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });
        const redirectTo = redirectUrl || '/home';
        res.json({ message: 'Login successful', redirectTo });
    } catch (err) {
        console.error('Error in /login:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/'); // Chuyển hướng về trang home
});

module.exports = router;