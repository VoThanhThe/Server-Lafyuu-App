const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {type: String, required: true}, // Tên sản phẩm
    price: {type: Number, required: true}, // Giá
    quantity: {type: Number, required: true}, // Số lượng tồn kho
    image: {type: String, required: true}, // Hình ảnh sản phẩm
    category: {type: ObjectId, ref: 'category', required: true}, // khóa ngoại(Danh mục sản phẩm)
    status: {type: Boolean, default: true},
    sale: {type: Number, default: 0},
    total_start: {type: Number, default: 0},
    total_rating: {type: Number, default: 0},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});
module.exports = mongoose.models.product || mongoose.model('product', schema);
// product -----> products