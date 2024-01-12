const userService = require('./UserService');
//const mailer = require('nodemailer');

// const transporter = mailer.createTransport({
//     pool: true,
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use TLS
//     auth: {
//         user: 'thevtps24513@fpt.edu.vn',
//         pass: 'pnpxfmlosbkdmkhm'
//     },
// });

const login = async (email,password) => {
    return await userService.login(email,password);
}

const register = async (email,password) => {
    try {
        return await userService.register(email,password);
    } catch (error) {
        console.log(error);
    }   
    
}

const edit_profile = async (user_id, avatar, name, gender, birthday) => {
    try {
        return await userService.edit_profile(user_id, avatar, name, gender, birthday);
    } catch (error) {
        console.log(error);
    }   
    
}

const getUserByID = async (user_id) => {
    try {
        return await userService.getUserByID(user_id);
    } catch (error) {
        console.log(error);
    }   
    
}

const sendEmail = async (req,res,next) => {
    try {
    
    } catch (error) {
        console.log(error);
    }   
    
}

const getAllUser = async () => {
    try {
        return await userService.getAllUser();
    } catch (error) {
        throw error;
    }
}


module.exports = {login, register, edit_profile, getAllUser, getUserByID};
//Email account;
//pnpxfmlosbkdmkhm