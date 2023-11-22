const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    name: { type: String, required: true },
    details: {
        card_number: { type: String },
        expiration_date: { type: String },
        cvv: { type: String }
    }
});
module.exports = mongoose.models.payment || mongoose.model('payment', schema);
// order -----> orders
