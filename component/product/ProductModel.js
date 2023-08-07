const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {type: String},
    price: {type: Number},
    quantity: {type: Number},
    image: {type: String},
    category: {type: ObjectId, ref: 'category'} // khoa ngoai
});
module.exports = mongoose.models.product || mongoose.model('product', schema);
// product -----> products