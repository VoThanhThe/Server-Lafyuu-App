const favoriteService = require('./FavoriteService');

const getAllFavorite = async (user_id) =>{
    try {
        return await favoriteService.getAllFavorite(user_id);
    } catch (error) {
        throw error;
    }
}

const deleteFavoriteByID = async (id) => {
    try {
        return await favoriteService.deleteFavoriteByID(id);
    } catch (error) {
        throw error;
    }
}

const addNewFavorite = async (user_id, product_id) => {
    try {
        await favoriteService.addNewFavorite(user_id, product_id);
    } catch (error) {
        console.log('get address by id error',error);
    }
}

module.exports ={getAllFavorite, addNewFavorite, deleteFavoriteByID };