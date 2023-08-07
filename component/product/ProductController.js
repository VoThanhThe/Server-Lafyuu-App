const productService = require('./ProductService');

const getAllProduct = async () => {
    try {
        //return await productService.getAllProducts();
        return await productService.getAllProducts();
    } catch (error) {
        throw error;
    }
}

const deleteProductByID = async (id) => {
    try {
        return await productService.deleteProductByID(id);
    } catch (error) {
        throw error;
    }
}

const updateProduct = async (id,name,price,quantity,image,category) => {
    try {
        return await productService.updateProduct(id,name,price,quantity,image,category);
    } catch (error) {
        console.log('Update product error',error);
    }
}

const getProductByID = async (id) => {
    try {
        return await productService.getProductByID(id);
    } catch (error) {
        console.log('get product by id error',error);
    }
}


const addNewProduct = async (name,price,quantity,image,category) => {
    try {
        await productService.addNewProduct(name,price,quantity,image,category);
    } catch (error) {
        console.log('get product by id error',error);
    }
}

const search = async (keyword) => {
    try {
        return await productService.search(keyword);
    } catch (error) {
        console.log('search product error',error);
    }
}

module.exports = {getAllProduct, deleteProductByID, addNewProduct, 
    updateProduct, getProductByID, search};