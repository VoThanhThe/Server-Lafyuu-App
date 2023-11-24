const express = require('express');
const router = express.Router();
const orderController = require('../../component/orders/OrderController');
const productModel = require('../../component/product/ProductModel');
const userModel = require('../../component/users/UserModel');

const jwt = require('jsonwebtoken');
const { authenApp } = require('../../middle/Authen');
const upload = require('../../middle/UploadFile');

//http://localhost:3000/api/order



//lấy danh sách sản phẩm
//http://localhost:3000/api/order/:id

router.get('/:id', [authenApp], async (req, res, next) => {
    try {
        const {id} = req.params;
        const orders = await orderController.getAllOrders(id);
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
//http://localhost:3000/api/product/:id
router.get('/:id', async (req, res, next) => {
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
//http://localhost:3000/api/product/
router.post('/', async (req, res, next) => {
    try {
        const { total_price, address, receiver_name, phone, items, user_id } = req.body;
        const user = await userModel.findById(user_id);
        // const product = await productModel.findById(product_id);

        // let itemOrder = [
        //     {
        //         product_id:  product_id,
        //         quantity: quantity,
        //         price: phone
        //     },
        //     {
        //         product_id:  product_id,
        //         quantity: quantity,
        //         price: price
        //     }
        // ]

        // if (!user || !product) {
        //     return res.status(400).json({ message: 'Invalid user or product' });
        // }
        const orders = await orderController.addNewOrder(total_price, address, receiver_name, phone, items, user_id);
        // if (orders) {
        //     product.quantity -= quantity;
        //     await product.save();
        // }
        return res.status(200).json({ result: true, orders: orders });
    } catch (error) {
        return res.status(400).json({ result: false, errors: error.message });
    }
})

module.exports = router;