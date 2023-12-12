const productModel = require('./ProductModel');

//lấy toàn bộ sản phẩm
//lấy theo page
//limit
const getAllProducts = async () => {
    try {
        // return data;
        // select * from 
        return await productModel.find({status: true}).sort({created_at: -1});
    } catch (error) {
        console.log('Get all products error: ', error);
    }
    return [];
}

const getProductsByCategory = async (categoryID) => {
    try {
        // return data;
        // select * from 
        return await productModel.find({category: categoryID});
    } catch (error) {
        console.log('Get all products error: ', error);
    }
    return [];
}

//Delete product
const deleteProductByID = async (id) => {
    try {
        let product = await productModel.findById(id);
        if (product) {
            product.status = false;
            await product.save();
            return true;
        }
    } catch (error) {
        console.log('Delete product by ID error', error);
        throw error;
    }
}

//Them moi san pham
const addNewProduct = async (name, price, quantity, image, category, sale) => {
    try {
        const newProduct = {
            name,
            price,
            quantity,
            image,
            category,
            sale
        }
        // data.push(newProduct);
        await productModel.create(newProduct);
        return true
    } catch (error) {
        console.log('Add new product error', error);

    }
    return false;
}

//Update san pham
const updateProduct = async (id, name, price, quantity, image, category, sale) => {
    try {
        let item = await productModel.findById(id);
        //let item = await itemModel.findById(id);
        if (item) {
            item.name = name ? name : item.name;
            item.price = price ? price : item.price;
            item.quantity = quantity ? quantity : item.quantity;
            item.image = image ? image : item.image;
            item.category = category ? category : item.category;
            item.sale = sale ? sale : item.sale;
            item.updated_at = new Date();
            await item.save();
            return true;
        }

    } catch (error) {
        console.log('Update product error', error);
    }
    return false;
}

//lay thong tin san pham theo id
const getProductByID = async (id) => {
    try {
        let product = await productModel.findById(id);
        return product;
    } catch (error) {
        console.log('Get product by ID error', error);
    }
    return null;

}
/**
 * 
 * Select * from products where name like '%query%'
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
        let product = await productModel.find(query);
        console.log('keyword: ', keyword);
        return product;
    } catch (error) {
        console.log('Get product by ID error: ', error);
    }
    return null;
}


const getAllProducts2 = async () => {
    try {
        // return data;
        // select * from 
        let products = await productModel
            .find({}, 'name price category')// lấy 2 file name và price
            .populate('category') // lấy thông tin category
            .sort({price: -1}) // sắp xếp giảm dần
            .skip(2)           // bỏ qua 2 sản phẩm đầu tiên,
            .limit(2);           //lấy 2 sản phẩm
        return products;
    } catch (error) {
        console.log('Get all products error: ', error);
    }
    return [];
}
module.exports = { getAllProducts, deleteProductByID, addNewProduct, updateProduct, 
    getProductByID, search, getAllProducts2, getProductsByCategory };

//size = 20, page = 4
