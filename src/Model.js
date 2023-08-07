const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {type: String},
    age: {type: Number},
    email: {type: String, require: true, unique: true},
    password: {type: String},
    createAt: {type: Date},
    updateAt: {type: Date, default: Date.now} // khoa ngoai
});
module.exports = mongoose.models.user || mongoose.model('user', schema);
// product -----> products