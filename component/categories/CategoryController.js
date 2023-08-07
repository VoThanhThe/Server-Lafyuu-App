const categoryService = require('./categoryService');

const getAllCategory = async () =>{
    try {
        return await categoryService.getAllCategory();
    } catch (error) {
        throw error;
    }
}

module.exports ={getAllCategory};