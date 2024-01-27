const express = require('express');
const router = express.Router();
const notificationController = require('../../component/notification/NotificationController');
const { authenApp } = require('../../middle/Authen');

//lấy danh sách sản phẩm
//http://localhost:3000/api/notification

router.get('/', [authenApp], async (req, res, next) => {
    try {
        const {user_id} = req.query;
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
        const {id} = req.query;
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

module.exports = router;