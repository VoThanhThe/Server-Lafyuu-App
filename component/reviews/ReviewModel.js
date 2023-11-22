const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.models.review || mongoose.model('review', schema);
// review -----> reviews