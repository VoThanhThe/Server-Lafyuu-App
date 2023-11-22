const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {type: String}, // Tên sản phẩm
    price: {type: Number}, // Giá
    quantity: {type: Number}, // Số lượng tồn kho
    image: {type: String}, // Hình ảnh sản phẩm
    category: {type: ObjectId, ref: 'category'} // khóa ngoại(Danh mục sản phẩm)
});
module.exports = mongoose.models.product || mongoose.model('product', schema);
// product -----> products