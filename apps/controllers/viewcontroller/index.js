const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../config/setting.json');
// Middleware để giải mã token và truyền thông tin vào res.locals
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    res.locals.user = null;
    res.locals.isAuthenticated = false;
    res.locals.isAdmin = false;
    res.locals.address = null;
    res.locals.phonenumber = null;
    if (token) {
        try {
            const decoded = jwt.verify(token, config.jwt.secret); // Giải mã token
            res.locals.user = decoded.username; // Tên người dùng
            res.locals.isAuthenticated = true; // Đã đăng nhập
            res.locals.isAdmin = decoded.roles && decoded.roles.includes('admin'); // Vai trò ADMIN
            res.locals.address = decoded.address;
            res.locals.phonenumber = decoded.phonenumber;

        } catch (err) {
            res.clearCookie('token'); // Xóa token không hợp lệ
        }
    }
    next();
};

// Áp dụng middleware cho tất cả route trong viewcontroller
router.use(authMiddleware);

// Gắn các controller con
router.use('/home', require(__dirname + '/homecontroller.js'));
router.use('/', require(__dirname + '/homecontroller.js'));
router.use('/product', require(__dirname + '/productcontroller.js'));
router.use('/cart', require(__dirname + '/cartcontroller.js'));
router.use('/info', require(__dirname + '/infocontroller.js'));
router.use('/user', require(__dirname + '/usercontroller.js'));
router.use('/admin', require(__dirname + '/admin/admincontroller.js'));
router.use('/auth', require(__dirname + '/authcontroller.js'));

module.exports = router;