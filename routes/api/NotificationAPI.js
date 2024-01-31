const express = require('express');
const router = express.Router();
const notificationController = require('../../component/notification/NotificationController');
const { authenApp } = require('../../middle/Authen');
const admin = require('firebase-admin');


// Khởi tạo Firebase Admin SDK
const serviceAccount = require('../../config/app-shoes-6fd12-40dccb74b302.json');
  

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//lấy danh sách sản phẩm
//http://localhost:3000/api/notification

router.get('/', [authenApp], async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const notification = await notificationController.getAllNotification(user_id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, notification: notification, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})
//http://localhost:3000/api/notification/delete-notification
router.post('/delete-notification', [authenApp], async (req, res, next) => {
    try {
        const { id } = req.query;
        const notification = await notificationController.deleteNotificationByID(id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, notification: notification, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})
//http://localhost:3000/api/notification/update-notification
router.post('/update-notification', [authenApp], async (req, res, next) => {
    try {
        const { id } = req.query;
        const notification = await notificationController.updateNotification(id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, notification: notification, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})

//http://localhost:3000/api/notification
router.post('/', [authenApp], async (req, res, next) => {
    try {
        const { title, body, token, data } = req.body;

        const message = {
            notification: {
                title: title,
                body: body,
            },
            data: data,
            token: token,
        };

        // Gửi thông báo
        admin.messaging().send(message)
            .then((response) => {
                console.log('Successfully sent message:', response);
                res.status(200).json({ success: true, message: 'Notification sent successfully' });
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                res.status(500).json({ success: false, error: 'Error sending notification' });
            });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})

module.exports = router;