const express = require('express');
const router = express.Router();
const productController = require('../../component/product/ProductController');
const productService = require('../../component/product/ProductService');
const jwt = require('jsonwebtoken');
const { authenApp } = require('../../middle/Authen');
const upload = require('../../middle/UploadFile');

//http://localhost:3000/api/product



//lấy danh sách sản phẩm
//http://localhost:3000/api/product

router.get('/',[authenApp], async (req, res, next) => {
    try {
        const products = await productController.getAllProduct();
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({products,returnData});
    } catch (error) {
        return res.status(400).json({});
    }
})

//http://localhost:3000/api/product/categories/?categoryID=

router.get('/categories',[authenApp], async (req, res, next) => {
    try {
        const {categoryID} = req.query;
        const products = await productController.getProductsByCategory(categoryID);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({result: true, products: products,returnData});
    } catch (error) {
        return res.status(400).json({result: false, products: null, error: error.message});
    }
})
//http://localhost:3000/api/product/:id
router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const products = await productController.getProductByID(id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        res.status(200).json({products,returnData});
    } catch (error) {
        res.status(400).json({});
    }
})
//them san pham
//http://localhost:3000/api/product/
router.post('/', async (req, res, next) => {
    try {
        const {name, price, quantity,image,category, sale} = req.body;
        await productController.addNewProduct(name,price,quantity,image,category, sale);
        return res.status(200).json({products});
    } catch (error) {
        return res.status(400).json({});
    }
})

//tìm kiếm sản phẩm
//http://localhost:3000/api/product/search/name?keyword=abc
router.get('/search/name', async (req, res, next) => {
    try {
        const {keyword, category, sort} = req.query;
        const products = await productController.search(keyword, category, sort);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({products,returnData});
        
    } catch (error) {
        console.log('Search product error: ', error);
        return res.status(500).json({});
    }
})


//upload hình ảnh sản phẩm lên server
//http://localhost:3000/api/product/upload
router.post('/upload',[upload.single('image')],
 async (req, res, next) => {
    try {
        const {file} = req;
        if(!file){
            return res.status(400).json({return: false});
        }else{
            const url = `http://192.168.43.246:3000/image/${file.filename}`;
            const returnData = {
                error: false,
                responseTimestamp: new Date(),
                statusCode: 200,
                data: {},
            }
            return res.status(200).json({return: true, url,returnData});
        }
    } catch (error) {
        console.log('Upload image error: ', error);
        return res.status(500).json({});
    }
})

module.exports = router;