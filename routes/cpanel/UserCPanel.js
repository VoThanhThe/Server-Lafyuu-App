const express = require('express');
const router = express.Router();
const userController = require('../../component/users/UserController');
const auth = require('../../middle/Authen');

//http://localhost:3000/cpanel/user/get-all-account
router.get('/get-all-account', [auth.authenWeb], async function (req, res, next) {
    const users = await userController.getAllUser();
    res.render('./user/userTable', { users });
  });

module.exports = router;