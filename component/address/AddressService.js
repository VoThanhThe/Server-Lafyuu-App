const addressModel = require('./AddressModel');


const getAllAddress = async (user_id) => {
    try {
        // return data
        // select * from categories
        return await addressModel.find({user_id: user_id}).sort({created_at: -1});
    } catch (error) {
        console.log('get all address error: ', error);
    }
    return [];
}

//Delete address
const deleteAddressByID = async (id) => {
    try {
        let address = await addressModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('Delete address by ID error', error);
        throw error;
    }
}

//Them moi danh mục
const addNewAddress = async (address, receiver_name, phone, user_id) => {
    try {
        const newaddress = {
            address, receiver_name, phone, user_id
        }
        // data.push(newaddress);
        return await addressModel.create(newaddress);
    } catch (error) {
        console.log('Add new address error', error);

    }
    return false;
}

//Update san pham
const updateAddress = async (id, address, receiver_name, phone) => {
    try {
        let item = await addressModel.findById(id);
        //let item = await itemModel.findById(id);
        if (item) {
            item.address = address ? address : item.address;
            item.receiver_name = receiver_name ? receiver_name : item.receiver_name;
            item.phone = phone ? phone : item.phone;
            item.updated_at = new Date();
            return await item.save();
        }

    } catch (error) {
        console.log('Update address error', error);
    }
    return false;
}

//lay thong tin san pham theo id
const getAddressByID = async (id) => {
    try {
        let address = await addressModel.findById(id);
        return address;
    } catch (error) {
        console.log('Get address by ID error', error);
    }
    return null;

}
/**
 * 
 * Select * from addresss where name like '%query%'
 * and price > 1000 and price < 2000
 * or quantity < 100
 */

module.exports = {getAllAddress, getAddressByID, 
    addNewAddress, updateAddress, deleteAddressByID};