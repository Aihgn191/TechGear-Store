var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mail,
        pass: process.env.mail_pass
    }
});

var CategoryService = require("../../services/categoryService");

router.get("/", async function (req, res) {
    res.render("info/index.ejs");
});
router.get("/contact", async function (req, res) {
    res.render("info/contact.ejs");
});

router.post("/contact", async function (req, res) {
    var body = {
        from: process.env.mail,
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message,
    }
    try {
        transporter.sendMail(body, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error sending email",
            error: error.message,
        });
    }
    return res.status(200).json({
        message: "Email sent successfully",
        data: body,
    });
});

module.exports = router;