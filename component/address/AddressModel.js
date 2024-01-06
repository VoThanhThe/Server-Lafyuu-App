const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    address: { type: String, required: true },
    receiver_name: { type: String, required: true },
    phone: { type: String, required: true },
    user_id: { type: ObjectId, ref: 'user', required: true }, // Tham chiếu đến mô hình người dùng (User)
    create_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.models.address || mongoose.model('address', schema);
// order -----> orders
