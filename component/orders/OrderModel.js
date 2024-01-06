const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    order_date: { type: Date, default: Date.now }, // Thời gian đặt hàng
    total_price: { type: Number, required: true }, // Tổng giá trị đơn hàng
    status: { type: String, default: "Processing" }, // Trạng thái đơn hàng (đang xử lý, đã giao hàng, v.v.)
    items: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    shipping_info: { type: Schema.Types.ObjectId, ref: 'address', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true },

});
module.exports = mongoose.models.order || mongoose.model('order', schema);
// order -----> orders
