const express = require('express');
const router = express.Router();
const categoryController = require('../../component/categories/CategoryController');

const jwt = require('jsonwebtoken');
const { authenApp } = require('../../middle/Authen');
const upload = require('../../middle/UploadFile');


//lấy danh sách sản phẩm
//http://localhost:3000/api/categories/get-all-categories

router.get('/get-all-categories', [authenApp], async (req, res, next) => {
    try {
        const categories = await categoryController.getAllCategory();
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, categories: categories, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})

router.get('/get-categories-by-women', [authenApp], async (req, res, next) => {
    try {
        const categories = await categoryController.getCategoryByWomen();
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, categories: categories, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})

router.get('/get-categories-by-man', [authenApp], async (req, res, next) => {
    try {
        const categories = await categoryController.getCategoryByMan();
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, categories: categories, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})

module.exports = router;