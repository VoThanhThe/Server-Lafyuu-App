const orderModel = require('./OrderModel');

//lấy toàn bộ sản phẩm
//lấy theo page
//limit
const getAllOrders = async (id) => {
    try {
        return await orderModel.find({user_id: id}).sort({ order_date: -1 });
    } catch (error) {
        console.log('Get all orders error: ', error);
    }
    return [];
}

//Delete product
const deleteOrderByID = async (id) => {
    try {
        await orderModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log('Delete order by ID error', error);
        throw error;
    }
}

//Them moi đơn đặt hàng
const addNewOrder = async (total_price, address, receiver_name, phone, items, user_id) => {
    try {
        const newOrder = {
            total_price,
            shipping_info: {
                address: address,
                receiver_name: receiver_name,
                phone: phone
            },
            items: items,
            user_id
        }
       const order = await orderModel.create(newOrder);
        return order;
    } catch (error) {
        console.log('Add new order error', error);

    }
    return false;
}

//Update đơn hàng
const updateOrder = async (id, status) => {
    try {
        let item = await orderModel.findById(id);
        //let item = await itemModel.findById(id);
        if (item) {
            item.status = status ? status : item.status;
            await item.save();
            return true;
        }

    } catch (error) {
        console.log('Update product error', error);
    }
    return false;
}

//lay thong tin đơn hàng theo id
const getOrderByID = async (id) => {
    try {
        let order = await orderModel.findById(id).sort({ order_date: -1 });
        return order;
    } catch (error) {
        console.log('Get order by ID error', error);
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
        let product = await orderModel.find(query);
        console.log('keyword: ', keyword);
        return product;
    } catch (error) {
        console.log('Get product by ID error: ', error);
    }
    return null;
}

module.exports = {
    getAllOrders, deleteOrderByID, addNewOrder, updateOrder,
    getOrderByID
};

//size = 20, page = 4
