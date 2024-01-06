const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    user_id: { type: ObjectId, ref: 'user', required: true }, // Tham chiếu đến mô hình người dùng (User)
    product_id: { type: ObjectId, ref: 'product', required: true }, // Tham chiếu đến mô hình sản phẩm (Product)
    created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.models.favorite || mongoose.model('favorite', schema);
// order -----> orders
