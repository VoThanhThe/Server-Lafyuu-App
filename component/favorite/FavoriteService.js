const FavoriteModel = require('./FavoriteModel');
const favoriteModel = require('./FavoriteModel');


const getAllFavorite = async (user_id) => {
    try {
        // return data
        // select * from categories
        return await favoriteModel.find({ user_id: user_id }).populate('product_id').sort({ created_at: -1 });
    } catch (error) {
        console.log('get all favorite error: ', error);
    }
    return [];
}

//Delete favorite
const deleteFavoriteByID = async (id) => {
    try {
        let favorite = await favoriteModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('Delete favorite by ID error', error);
        throw error;
    }
}

//Them moi danh mục
const addNewFavorite = async (user_id, product_id) => {
    try {
        const product = await FavoriteModel.findOne({ user_id: user_id, product_id: product_id })
        // data.push(newfavorite);
        if (!product) {
            const newfavorite = {
                user_id, product_id
            }
            return await favoriteModel.create(newfavorite);
        } else {
            return false;
        }
    } catch (error) {
        console.log('Add new favorite error', error);
        return false;
    }
}

module.exports = { getAllFavorite, addNewFavorite, deleteFavoriteByID };