const express = require('express');
const router = express.Router();
const orderController = require('../../component/orders/OrderController');
const notificationController = require('../../component/notification/NotificationController');
const productModel = require('../../component/product/ProductModel');
const userModel = require('../../component/users/UserModel');

const jwt = require('jsonwebtoken');
const { authenApp } = require('../../middle/Authen');
const upload = require('../../middle/UploadFile');

//http://localhost:3000/api/order



//lấy danh sách sản phẩm
//http://localhost:3000/api/order/:id

router.get('/:user_id', [authenApp], async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const orders = await orderController.getAllOrders(user_id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, orders: orders, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})
//http://localhost:3000/api/order/:id
router.get('/:id/order-detail', async (req, res, next) => {
    try {
        const { id } = req.params;
        const orders = await orderController.getOrderByID(id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        res.status(200).json({ result: true, orders: orders, returnData });
    } catch (error) {
        res.status(400).json({ result: false, orders: null });
    }
})
//them san pham
//http://localhost:3000/api/order
router.post('/', async (req, res, next) => {
    try {
        const { total_price, shipping_info, items, user_id } = req.body;
        const user = await userModel.findById(user_id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        const orders = await orderController.addNewOrder(total_price, shipping_info, items, user_id);
        const orderId = orders._id;
        await notificationController.addNotificationOrder(user_id, orderId);
        return res.status(200).json({ result: true, orders: orders, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, errors: error.message });
    }
})

module.exports = router;