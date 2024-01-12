const express = require('express');
const router = express.Router();
const userController = require('../../component/users/UserController');
const validation = require('../../middle/Validation');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');

const userModel = require('../../component/users/UserModel');
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

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vothanhthepct2020@gmail.com',
        pass: 'kunnlcokbzgpswxz'
    }
});

router.get('/verify-email', async (req, res, next) => {
    try {
        const { email, password } = req.query;
        const user = { email: email, password: password };
        if (user) {
            await userModel.create(user);
            return res.status(200).json({ user });
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ result: false, message: 'Invalid or expired token' });
    }
});

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
        const { email, password } = req.body;
        const user = await userController.login(email, password);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        if (user) {
            const token = jwt.sign({ user }, "secret",
                { expiresIn: '1h' });
            return res.status(200).json({ result: true, returnData, user: user, token });
        }
        return res.status(400).json({ result: false, user: null });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, user: null });
    }
})

//http://localhost:3000/api/user/register
router.post('/register', [validation.checkRegister], async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = { email, password: hash, role: 1 };
            // Dùng mã HTML cho nội dung email
            const htmlContent = `
  <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-family: 'Arial', sans-serif;">
    <img src="https://firebasestorage.googleapis.com/v0/b/app-shoes-6fd12.appspot.com/o/logo.png?alt=media&token=1cd289d8-ef2f-4cd2-b429-6d00bc8d54e9" alt="Your Alt Text" style="max-width: 100%; height: auto;">
    <h2 style="color: #333;">Hello ${newUser.email}!</h2>
    <p style="color: #666; font-size: 16px;">Thanks for registering on our site. Please verify your email to continue...</p>
    <a href="https://lafyuu-shop.onrender.com/api/user/verify-email?email=${newUser.email}&password=${newUser.password}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease;">
      Verify Your Email
    </a>
  </div>
`;
            // send verification mail to user
            let mailDetails = {
                from: ' "Verify your email" <vothanhthepct2020@gmail.com>',
                to: newUser.email,
                subject: 'Verify Your Email',
                html: htmlContent
            };

            //sending mail
            transporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
            return res.status(200).json({ user: newUser });
        } else {
            return res.status(400).json({ result: false, message: 'Email đã tồn tại' });
        }
        // const result = await userController.register(email,password);
        // const returnData = {
        //     error: false,
        //     responseTimestamp: new Date(),
        //     statusCode: 200,
        //     data: {},
        // }
        // return res.status(200).json({returnData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false });
    }
})

//http://localhost:3000/api/user/id/edit_profile
router.post('/:user_id/edit_profile', async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const { avatar, name, gender, birthday } = req.body;
        const result = await userController.edit_profile(user_id, avatar, name, gender, birthday);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ returnData });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false });
    }
})


module.exports = router;