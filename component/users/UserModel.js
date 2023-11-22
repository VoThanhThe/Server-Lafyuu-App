const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    email: { type: String, unique: true, required: true }, // email
    password: { type: String, required: true }, // Mật khẩu (đã mã hóa)
    profile: {
        avatar: { type: String },// ảnh đại diện
        name: { type: String }, // tên người dùng
        gender: { type: String },// giới tính
        birthday: { type: String },// ngày sinh
    },
    role: { type: Number, default: 1, }, // Quyền hạn (quyền người dùng, quản trị viên, v.v.)
    //1: user, 100: admin, 1000: system
});
module.exports = mongoose.models.user || mongoose.model('user', schema);
// user -----> users
