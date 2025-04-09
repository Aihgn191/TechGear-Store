var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../config/setting.json');

router.get('/login', async function (req, res) {
    const token = req.cookies.token;
    const redirect = req.query.redirect || '/home'; // Lấy redirect từ query, mặc định là /home
    // Kiểm tra nếu đã đăng nhập
    if (token) {
        try {
            jwt.verify(token, config.jwt.secret); // Xác minh token
            return res.redirect(redirect); // Chuyển hướng nếu token hợp lệ
        } catch (err) {
            res.clearCookie('token');
        }
    }
    // Nếu chưa đăng nhập hoặc token không hợp lệ, hiển thị trang login
    res.render('login.ejs', { redirect });
});

router.get('/home', (req, res) => {
    res.render('home.ejs', { user: req.cookies.token ? 'Logged in' : null });
});

module.exports = router;