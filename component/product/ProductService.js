const productModel = require('./ProductModel');

//lấy toàn bộ sản phẩm
//lấy theo page
//limit
const PAGE_SIZE = 10;

const getAllProducts = async (page) => {
    try {
        if (page && page > 0) {
            const skipCount = (parseInt(page) - 1) * PAGE_SIZE;

            const products = await productModel
                .find({ status: true })
                .populate("category")
                .sort({ created_at: -1 })
                .skip(skipCount)
                .limit(PAGE_SIZE);

            return products;
        } else {
            // Nếu page không có hoặc không hợp lệ, trả về toàn bộ danh sách
            return await productModel.find({ status: true }).populate("category").sort({ created_at: -1 });
        }
    } catch (error) {
        console.log('Get all products error: ', error);
    }
    return [];
}

const getProductsByCategory = async (categoryID) => {
    try {
        // return data;
        // select * from 
        return await productModel.find({ category: categoryID });
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
        let product = await productModel.findById(id).populate("category");
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
const search = async (keyword, categoryId, sort) => {
    try {
        let query = {
            name: { $regex: keyword, $options: 'i' },
        }
        let queryAll = {
            $and: [
                { name: { $regex: keyword, $options: 'i' } },
                { category: categoryId }
            ]
        }
        let queryByCategory = {
            $and: [
                { category: categoryId }
            ]
        }

        if (keyword && categoryId && sort) {
            let product = await productModel.find(queryAll).sort({ price: sort });
            return product;
        } else if (keyword && sort) {
            let product = await productModel.find(query).sort({ price: sort });
            return product;
        } else if (categoryId && sort) {
            let product = await productModel.find(queryByCategory).sort({ price: sort });
            return product;
        }

        // let product = await productModel.find(queryAll).sort({ quantity: sort });
        // return product;
        return null;
    } catch (error) {
        console.log('Get product by ID error: ', error);
    }
}


const getAllProducts2 = async () => {
    try {
        // return data;
        // select * from 
        let products = await productModel
            .find({}, 'name price category')// lấy 2 file name và price
            .populate('category') // lấy thông tin category
            .sort({ price: -1 }) // sắp xếp giảm dần
            .skip(2)           // bỏ qua 2 sản phẩm đầu tiên,
            .limit(2);           //lấy 2 sản phẩm
        return products;
    } catch (error) {
        console.log('Get all products error: ', error);
    }
    return [];
}
module.exports = {
    getAllProducts, deleteProductByID, addNewProduct, updateProduct,
    getProductByID, search, getAllProducts2, getProductsByCategory
};

//size = 20, page = 4
