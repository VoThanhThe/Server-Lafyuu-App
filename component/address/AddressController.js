const addressService = require('./AddressService');

const getAllAddress = async (user_id) =>{
    try {
        return await addressService.getAllAddress(user_id);
    } catch (error) {
        throw error;
    }
}

const deleteAddressByID = async (id) => {
    try {
        return await addressService.deleteAddressByID(id);
    } catch (error) {
        throw error;
    }
}

const updateAddress = async (id,address, receiver_name, phone) => {
    try {
        return await addressService.updateAddress(id,address, receiver_name, phone);
    } catch (error) {
        console.log('Update address error',error);
    }
}

const getAddressByID = async (id) => {
    try {
        return await addressService.getAddressByID(id);
    } catch (error) {
        console.log('get address by id error',error);
    }
}


const addNewAddress = async (address, receiver_name, phone, user_id) => {
    try {
        await addressService.addNewAddress(address, receiver_name, phone, user_id);
    } catch (error) {
        console.log('get address by id error',error);
    }
}

module.exports ={getAllAddress, addNewAddress, 
    updateAddress, getAddressByID, deleteAddressByID };