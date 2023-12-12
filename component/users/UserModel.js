const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    email: { type: String, unique: true, required: true }, // email
    password: { type: String, required: true }, // Mật khẩu (đã mã hóa)
    profile: {
        avatar: { type: String, default: "" },// ảnh đại diện
        name: { type: String, default: "" }, // tên người dùng
        gender: { type: String, default: "" },// giới tính
        birthday: { type: String, default: "" },// ngày sinh
    },
    role: { type: Number, default: 1, }, // Quyền hạn (quyền người dùng, quản trị viên, v.v.)
    //1: user, 100: admin, 1000: system
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});
module.exports = mongoose.models.user || mongoose.model('user', schema);
// user -----> users
