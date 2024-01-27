const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    user_id: { type: ObjectId, ref: 'user', required: true },
    metadata: {
        type: mongoose.Schema.Types.Mixed
    }
});
module.exports = mongoose.models.notification || mongoose.model('notification', schema);
// order -----> orders
