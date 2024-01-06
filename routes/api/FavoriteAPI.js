
const express = require('express');
const router = express.Router();
const favoriteController = require('../../component/favorite/FavoriteController');
const { authenApp } = require('../../middle/Authen');

//lấy danh sách sản phẩm
//http://localhost:3000/api/favorites/get-all-favorites

router.get('/get-all-favorites', [authenApp], async (req, res, next) => {
    try {
        const {user_id} = req.query;
        const favorite = await favoriteController.getAllFavorite(user_id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, favorites: favorite, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})
// http://localhost:3000/api/favorites/add-new-favorite
router.post('/add-new-favorite', [authenApp], async (req, res, next) => {
    try {
        const {user_id, product_id} = req.body;
        const favorites = await favoriteController.addNewFavorite(user_id, product_id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, favorites: favorites, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})
//http://localhost:3000/api/favorites/delete-favorite
router.post('/delete-favorite', [authenApp], async (req, res, next) => {
    try {
        const {id} = req.query;
        const favorites = await favoriteController.deleteFavoriteByID(id);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {},
        }
        return res.status(200).json({ result: true, favorites: favorites, returnData });
    } catch (error) {
        return res.status(400).json({ result: false, error: error });
    }
})

module.exports = router;