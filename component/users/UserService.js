const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');


const login = async (email, password) => {
    try {
        let user = await userModel.findOne({ email: email });
        if (user) {
            let check = bcrypt.compareSync(password, user.password);
            return check ? user : false;
        }
    } catch (error) {
        console.log('Login error: ' + error);
    }
    return false;
}

const register = async (email, password) => {
    try {
        //kiểm tra tài khoản đã có chưa
        // select * from users where email = email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = { email, password: hash, role: 1 };
            await userModel.create(newUser);
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

const edit_profile = async (user_id, avatar, name, gender, birthday, phone) => {
    try {
        //kiểm tra tài khoản đã có chưa
        // select * from users where email = email
        const user = await userModel.findOne({ _id: user_id });
        if (user) {
            user.profile.avatar = avatar ? avatar : user.profile.avatar;
            user.profile.name = name ? name : user.profile.name;
            user.profile.gender = gender ? gender : user.profile.gender;
            user.profile.birthday = birthday ? birthday : user.profile.birthday;
            user.profile.phone = phone ? phone : user.profile.phone;
            await user.save();
            return user;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

const getAllUser = async () => {
    try {
        // return data;
        // select * from 
        return await userModel.find({role: 1});
    } catch (error) {
        console.log('Get all users error: ', error);
    }
    return [];
}

const getUserByID = async (user_id) => {
    try {
        //kiểm tra tài khoản đã có chưa
        // select * from users where email = email
        const user = await userModel.findOne({ _id: user_id });
        return user;
    } catch (error) {
        console.log(error);
    }
    return false;
}

module.exports = { login, register, edit_profile, getAllUser, getUserByID };

var users = [
    { _id: 1, email: 'abc@gmail.com', password: '123', name: "Nguyễn Nam" },
    { _id: 2, email: 'xyz@gmail.com', password: '123', name: "Lệ Hoa" },
    { _id: 3, email: 'ijk@gmail.com', password: '123', name: "Lý Sự" },
]