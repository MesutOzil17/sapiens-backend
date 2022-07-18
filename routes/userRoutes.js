const express = require('express');
const {registerUser, authUser, updateTheme, getTheme} = require("../controllers/userControllers");
const router = express.Router();
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/theme').put(getTheme);
router.route('/theme-update').put(updateTheme);

module.exports = router;