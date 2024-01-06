const express = require('express');
const router = express.Router();
const addressController = require('../../component/address/AddressController');
const { authenApp } = require('../../middle/Authen');

//lấy danh sách sản phẩm
//http://localhost:3000/api/addresses/get-all-addresses

router.get('/get-all-addresses', [authenApp], async (req, res, next) => {
    try {
        const {user_id} = req.query;
        const address = await addressController.getAllAddress(user_id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, addresses: address, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})

// http://localhost:3000/api/addresses/get-address-by-id
router.get('/get-address-by-id/:id', [authenApp], async (req, res, next) => {
    try {
        const {id} = req.params;
        const address = await addressController.getAddressByID(id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, addresses: address, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})
// http://localhost:3000/api/addresses/add-new-address
router.post('/add-new-address', [authenApp], async (req, res, next) => {
    try {
        const {address, receiver_name, phone, user_id} = req.body;
        const addresses = await addressController.addNewAddress(address, receiver_name, phone, user_id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, addresses: addresses, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})
//http://localhost:3000/api/addresses/update-address
router.post('/update-address', [authenApp], async (req, res, next) => {
    try {
        const {id} = req.query;
        const {address, receiver_name, phone} = req.body;
        const addresses = await addressController.updateAddress(id, address, receiver_name, phone);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, addresses: addresses, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})
//http://localhost:3000/api/addresses/delete-address
router.post('/delete-address', [authenApp], async (req, res, next) => {
    try {
        const {id} = req.query;
        const addresses = await addressController.deleteAddressByID(id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, addresses: addresses, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})

module.exports = router;