const categoryModel = require('./CategoryModel');


const getAllCategory = async () => {
    try {
        // return data
        // select * from categories
        return await categoryModel.find();
    } catch (error) {
        console.log('get all category error: ', error);
    }
    return [];
}


module.exports = {getAllCategory};

var data = [{
    "_id": 1,
    "name": "Dickens LLC"
},{
    "_id": 2,
    "name": "LLC"
},{
    "_id": 3,
    "name": "DickCa"
},{
    "_id": 4,
    "name": "Kens LLC"
},{
    "_id": 5,
    "name": "DicC"
},{
    "_id": 6,
    "name": "Dens LC"
},{
    "_id": 7,
    "name": "Dikens LC"
},{
    "_id": 8,
    "name": "Chickckens LLC"
},{
    "_id": 9,
    "name": "Dickens Chickckens"
},{
    "_id": 10,
    "name": "Chickens DLC"
},]