const service = require('../src/Service');

const insert = async () => {
    try {
        //return await productService.getAllProducts();
        return await service.insert();
    } catch (error) {
        throw error;
    }
}

const update = async () => {
    try {
        //return await productService.getAllProducts();
        return await service.insert();
    } catch (error) {
        throw error;
    }
}