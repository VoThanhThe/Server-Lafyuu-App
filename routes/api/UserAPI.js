const express = require('express');
const router = express.Router();
const userController = require('../../component/users/UserController');
const validation = require('../../middle/Validation');
const jwt = require('jsonwebtoken');
// upload image
const appFirebase = require('../../config/FirebaseConfig');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}
//http://localhost:3000/api/user/upload
router.post('/upload', upload.single("avatar"), async (req, res, next) => {
    try {
        const { avatar } = req.body;
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `avatar/${req.file.originalname + "       " + dateTime}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        return res.status(200).json({ result: true, path: downloadURL });
    } catch (error) {
        return res.status(400).json({ result: false, message: error.message });
    }
});

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
        const {email, password} = req.body;
        const result = await userController.register(email,password);
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

//http://localhost:3000/api/user/id/edit_profile
router.post('/:user_id/edit_profile', async (req, res, next) => {
    try {
        const {user_id} = req.params;
        const {avatar, name, gender, birthday} = req.body;
        const result = await userController.edit_profile(user_id, avatar, name, gender, birthday);
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