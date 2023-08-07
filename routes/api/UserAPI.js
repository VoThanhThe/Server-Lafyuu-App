const express = require('express');
const router = express.Router();
const userController = require('../..//component/users/UserController');
const validation = require('../../middle/Validation');
const jwt = require('jsonwebtoken');

//http://localhost:3000/api/user

//http://localhost:3000/api/user/login
router.post('/login', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await userController.login(email,password);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        if(user){
            const token = jwt.sign({user}, "secret",
            {expiresIn: '1h'}); 
            return res.status(200).json({result: true,returnData, user: user, token});
        }
        return res.status(400).json({result: false, user: null});
    } catch (error) {
       console.log(error);
       return res.status(400).json({result: false, user: null});
    }
})

//http://localhost:3000/api/user/register
router.post('/register',[validation.checkRegister], async (req, res, next) => {
    try {
        const {email, password,name} = req.body;
        const result = await userController.register(email,password, name);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({returnData});
    } catch (error) {
       console.log(error);
       return res.status(400).json({result: false});
    }
})



module.exports = router;