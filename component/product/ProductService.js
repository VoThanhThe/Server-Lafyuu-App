const productModel = require('./ProductModel');

//lấy toàn bộ sản phẩm
//lấy theo page
//limit
const getAllProducts = async () => {
    try {
        // return data;
        // select * from 
        return await productModel.find();
    } catch (error) {
        console.log('Get all products error: ', error);
    }
    return [];
}

//Delete product
const deleteProductByID = async (id) => {
    try {
        // const index = data.findIndex(item => item._id.toString() == id.toString());
        // if(index >= 0){
        //     data.splice(index,1);
        // }

        await productModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log('Delete product by ID error', error);
        throw error;
    }
}

//Them moi san pham
const addNewProduct = async (name, price, quantity, image, category) => {
    try {
        const newProduct = {
            name,
            price,
            quantity,
            image,
            category
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
const updateProduct = async (id, name, price, quantity, image, category) => {
    try {
        let item = await productModel.findById(id);
        //let item = await itemModel.findById(id);
        if (item) {
            item.name = name ? name : item.name;
            item.price = price ? price : item.price;
            item.quantity = quantity ? quantity : item.quantity;
            item.image = image ? image : item.image;
            item.category = category ? category : item.category;
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
    getProductByID, search, getAllProducts2 };

//size = 20, page = 4

var data =
    [{
        "_id": 1,
        "name": "Dickens LLC",
        "price": 80,
        "quantity": 70,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 1
    }, {
        "_id": 2,
        "name": "Nitzsche-Johnson",
        "price": 61,
        "quantity": 10,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 2
    }, {
        "_id": 3,
        "name": "Gaylord, Bogisich and Will",
        "price": 58,
        "quantity": 39,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 6
    }, {
        "_id": 4,
        "name": "Wisoky LLC",
        "price": 54,
        "quantity": 41,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 1
    }, {
        "_id": 5,
        "name": "Okuneva, Gutkowski and Becker",
        "price": 70,
        "quantity": 52,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 7
    }, {
        "_id": 6,
        "name": "Keeling-Zboncak",
        "price": 22,
        "quantity": 60,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 4
    }, {
        "_id": 7,
        "name": "Spinka, Pfannerstill and Ankunding",
        "price": 63,
        "quantity": 48,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 8
    }, {
        "_id": 8,
        "name": "Schimmel-Cronin",
        "price": 92,
        "quantity": 51,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 4
    }, {
        "_id": 9,
        "name": "Walsh Inc",
        "price": 50,
        "quantity": 69,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 9
    }, {
        "_id": 10,
        "name": "Hyatt, Rogahn and Koepp",
        "price": 15,
        "quantity": 71,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 7
    }, {
        "_id": 11,
        "name": "Roob LLC",
        "price": 52,
        "quantity": 47,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 7
    }, {
        "_id": 12,
        "name": "Stanton LLC",
        "price": 31,
        "quantity": 53,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 5
    }, {
        "_id": 13,
        "name": "Bednar, Leffler and Kassulke",
        "price": 6,
        "quantity": 57,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 3
    }, {
        "_id": 14,
        "name": "Collier LLC",
        "price": 44,
        "quantity": 72,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 8
    }, {
        "_id": 15,
        "name": "Kuphal, Schumm and Graham",
        "price": 60,
        "quantity": 95,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 8
    }, {
        "_id": 16,
        "name": "Glover-Zboncak",
        "price": 6,
        "quantity": 70,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 2
    }, {
        "_id": 17,
        "name": "Ziemann Inc",
        "price": 59,
        "quantity": 32,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 4
    }, {
        "_id": 18,
        "name": "Stroman-Raynor",
        "price": 29,
        "quantity": 35,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 1
    }, {
        "_id": 19,
        "name": "Beatty Group",
        "price": 16,
        "quantity": 91,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 4
    }, {
        "_id": 20,
        "name": "Torp-Gottlieb",
        "price": 66,
        "quantity": 78,
        "image": "https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg",
        "category": 3
    }]
