const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    timeOrder: {type: Date, default: Date.now}, // Thời gian đặt hàng
    totalPrice: {type: Number, required: true}, // Tổng giá trị đơn hàng
    status: {type: String, default: "Đang xử lý"}, // Trạng thái đơn hàng (đang xử lý, đã giao hàng, v.v.)
    user: {type: ObjectId, ref: 'user'} // Thông tin giao hàng (địa chỉ, người nhận, v.v.)
});
module.exports = mongoose.models.order || mongoose.model('order', schema);
// order -----> orders
