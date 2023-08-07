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

const register = async (email,password, name) => {
    try {
        return await userService.register(email,password, name);
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


module.exports = {login, register};
//Email account;
//pnpxfmlosbkdmkhm