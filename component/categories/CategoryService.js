const categoryModel = require('./CategoryModel');


const getAllCategory = async () => {
    try {
        // return data
        // select * from categories
        return await categoryModel.find({status: true}).sort({created_at: -1});
    } catch (error) {
        console.log('get all category error: ', error);
    }
    return [];
}

const getCategoryByWomen = async () => {
    try {
        // return data
        // select * from categories
        return await categoryModel.find({gender: "Nữ"}).sort({created_at: -1});
    } catch (error) {
        console.log('get all category error: ', error);
    }
    return [];
}

const getCategoryByMan = async () => {
    try {
        // return data
        // select * from categories
        return await categoryModel.find({gender: "Nam"}).sort({created_at: -1});
    } catch (error) {
        console.log('get all category error: ', error);
    }
    return [];
}

//Delete category
const deleteCategoryByID = async (id) => {
    try {
        let category = await categoryModel.findById(id);
        if (category) {
            category.status = false;
            await category.save();
            return true;
        }
    } catch (error) {
        console.log('Delete category by ID error', error);
        throw error;
    }
}

//Them moi danh mục
const addNewCategory = async (name, gender, image, description) => {
    try {
        const newCategory = {
            name, gender, image, description
        }
        // data.push(newcategory);
        await categoryModel.create(newCategory);
        return true
    } catch (error) {
        console.log('Add new category error', error);

    }
    return false;
}

//Update san pham
const updateCategory = async (id, name, gender, image, description) => {
    try {
        let item = await categoryModel.findById(id);
        //let item = await itemModel.findById(id);
        if (item) {
            item.name = name ? name : item.name;
            item.gender = gender ? gender : item.gender;
            item.image = image ? image : item.image;
            item.description = description ? description : item.description;
            item.updated_at = new Date();
            await item.save();
            return true;
        }

    } catch (error) {
        console.log('Update category error', error);
    }
    return false;
}

//lay thong tin san pham theo id
const getCategoryByID = async (id) => {
    try {
        let category = await categoryModel.findById(id);
        return category;
    } catch (error) {
        console.log('Get category by ID error', error);
    }
    return null;

}
/**
 * 
 * Select * from categorys where name like '%query%'
 * and price > 1000 and price < 2000
 * or quantity < 100
 */
const search = async (keyword) => {
    try {
        let query = {
            //price: {$gt: 1000, $lt: 2000},
            //quantity: {$lte : 100},
            //$or: [{quantity: {$lte: 100}}, {quantity: { $gt: 200}}],
            // $regex: regular exeption
            // $options: i: ignore case
            //tìm kiếm theo tên sản phẩm có chứa keyword
            name: { $regex: keyword, $options: 'i' },
            
            //tìm kiếm theo tên
            //name: keyword,
        }
        let category = await categoryModel.find(query);
        console.log('keyword: ', keyword);
        return category;
    } catch (error) {
        console.log('Get category by ID error: ', error);
    }
    return null;
}

module.exports = {getAllCategory, getCategoryByID, 
    addNewCategory, updateCategory, deleteCategoryByID, getCategoryByWomen, getCategoryByMan};