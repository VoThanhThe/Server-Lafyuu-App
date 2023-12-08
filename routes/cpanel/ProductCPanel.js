const express = require('express');
const router = express.Router();
const productController = require('../../component/product/ProductController');
const categoryController = require('../../component/categories/CategoryController');
const uploadFile = require('../../middle/UploadFile');
const CONFIG = require('../../config/Config');
const auth = require('../../middle/Authen');

// upload image
const appFirebase = require('../../config/FirebaseConfig');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
const storageRef = ref(storage, 'products/');

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

//http://localhost:3000/cpanel/product/home
router.get('/home', async function (req, res, next) {
  const products = await productController.getAllProduct();
  res.render('./product/home', { products });
});

//http://localhost:3000/cpanel/product/
router.get('/', [auth.authenWeb], async function (req, res, next) {
  const products = await productController.getAllProduct();
  res.render('./product/list', { products });
});
//http://localhost:3000/cpanel/product/:id/delete
router.get('/:id/delete', [auth.authenWeb], async function (req, res, next) {
  try {
    const { id } = req.params;
    await productController.deleteProductByID(id);
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false });
  }

});

//http://localhost:3000/cpanel/product/new
//hien thi trang them moi san pham
router.get('/new', [auth.authenWeb], async function (req, res, next) {
  const categories = await categoryController.getAllCategory();
  res.render('user/form', { categories });
});

//http://localhost:3000/cpanel/product/new
//xu li them moi san pham
router.post('/new', [upload.single('image'),], async function (req, res, next) {
  try {
    //ipconfig
    // let {body, file} = req;
    // if(file){
    //   let image = `${CONFIG.CONTANTS.IP}images/${file.filename}`;
    //   body = {...body, image: image};
    // }
    let { name, price, quantity, image, category } = req.body;

    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `products/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File successfully uploaded.');
    // console.log("imageURL:", image);
    await productController.addNewProduct(name, price, quantity, downloadURL, category);
    return res.redirect('https://lafyuu-shop.onrender.com/cpanel/product');
  } catch (error) {
    console.log('Add new product error: ', error);
    next(error);
  }
});


//http://localhost:3000/cpanel/product/
//hien thi trang cap nhat san pham  
router.get('/:id/edit', [auth.authenWeb], async function (req, res, next) {
  try {
    const { id } = req.params;
    const product = await productController.getProductByID(id);
    let categories = await categoryController.getAllCategory();
    // console.log("Category: ", categories)
    for (let index = 0; index < categories.length; index++) {
      const element = categories[index];
      categories[index].selected = false;
      if (element._id.toString() == product.category.toString()) {
        categories[index].selected = true;
      }
    }

    res.render('product/edit', { product, categories });
  } catch (error) {
    next(error);
  }
});


//http://localhost:3000/cpanel/product/:id/edit
//xu li cap nhat san pham
router.post('/:id/edit', [upload.single('image'),], async function (req, res, next) {
  try {
    //cmd >>>>  ipconfig >>>>>>>>> IPv4 Address;
    // let { id } = req.params;
    // let { body, file } = req;
    // if (file) {
    //   let image = `${CONFIG.CONTANTS.IP}images/${file.filename}`;
    //   body = { ...body, image: image };
    // }
    // let { name, price, quantity, image, category } = body;
    const {id} = req.params;
    let { name, price, quantity, image, category } = req.body;

    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `products/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File successfully uploaded.');
    await productController.updateProduct(id, name, price, quantity, downloadURL, category);
    return res.redirect('https://lafyuu-shop.onrender.com/cpanel/product');
  } catch (error) {
    console.log('Update product error: ', error);
    next(error);
  }
});

module.exports = router;