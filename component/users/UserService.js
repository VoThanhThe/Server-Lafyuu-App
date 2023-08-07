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

const register = async (email, password, name) => {
    try {
        //kiểm tra tài khoản đã có chưa
        // select * from users where email = email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = { email, password: hash, name, role: 1 };
            await userModel.create(newUser);
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

module.exports = { login, register };

var users = [
    { _id: 1, email: 'abc@gmail.com', password: '123', name: "Nguyễn Nam" },
    { _id: 2, email: 'xyz@gmail.com', password: '123', name: "Lệ Hoa" },
    { _id: 3, email: 'ijk@gmail.com', password: '123', name: "Lý Sự" },
]