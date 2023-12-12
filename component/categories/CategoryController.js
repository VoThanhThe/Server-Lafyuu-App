const categoryService = require('./CategoryService');

const getAllCategory = async () =>{
    try {
        return await categoryService.getAllCategory();
    } catch (error) {
        throw error;
    }
}

const getCategoryByMan = async () =>{
    try {
        return await categoryService.getCategoryByMan();
    } catch (error) {
        throw error;
    }
}

const getCategoryByWomen = async () =>{
    try {
        return await categoryService.getCategoryByWomen();
    } catch (error) {
        throw error;
    }
}

const deleteCategoryByID = async (id) => {
    try {
        return await categoryService.deleteCategoryByID(id);
    } catch (error) {
        throw error;
    }
}

const updateCategory = async (id,name, gender, image, description) => {
    try {
        return await categoryService.updateCategory(id,name, gender, image, description);
    } catch (error) {
        console.log('Update product error',error);
    }
}

const getCategoryByID = async (id) => {
    try {
        return await categoryService.getCategoryByID(id);
    } catch (error) {
        console.log('get product by id error',error);
    }
}


const addNewCategory = async (name, gender, image, description) => {
    try {
        await categoryService.addNewCategory(name, gender, image, description);
    } catch (error) {
        console.log('get product by id error',error);
    }
}

const search = async (keyword) => {
    try {
        return await categoryService.search(keyword);
    } catch (error) {
        console.log('search product error',error);
    }
}
module.exports ={getAllCategory, addNewCategory, 
    updateCategory, getCategoryByID, deleteCategoryByID, getCategoryByMan, getCategoryByWomen };