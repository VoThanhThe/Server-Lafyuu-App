const express = require('express');
const router = express.Router();
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
const storageRef = ref(storage, 'categories/');

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

//http://localhost:3000/cpanel/categories
router.get('/', [auth.authenWeb], async function (req, res, next) {
  const categories = await categoryController.getAllCategory();
  res.render('./categories/list', { categories });
});
//http://localhost:3000/cpanel/categories/:id/delete
router.get('/:id/delete', [auth.authenWeb], async function (req, res, next) {
  try {
    const { id } = req.params;
    await categoryController.deleteCategoryByID(id);
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false });
  }

});

//http://localhost:3000/cpanel/categories/new
//hien thi trang them moi san pham
router.get('/new', [auth.authenWeb], async function (req, res, next) {
  res.render('categories/insert', {});
});

//http://localhost:3000/cpanel/categories/new
//xu li them moi san pham
router.post('/new', [upload.single('image'),], async function (req, res, next) {
  try {
    //ipconfig
    // let {body, file} = req;
    // if(file){
    //   let image = `${CONFIG.CONTANTS.IP}images/${file.filename}`;
    //   body = {...body, image: image};
    // }
    let { name, gender, image, description } = req.body;

    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `categories/${req.file.originalname + "       " + dateTime}`);

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
    await categoryController.addNewCategory(name, gender, downloadURL, description);
    return res.redirect('/cpanel/categories');
  } catch (error) {
    console.log('Add new categories error: ', error);
    next(error);
  }
});


//http://localhost:3000/cpanel/categories
//hien thi trang cap nhat san pham  
router.get('/:id/edit', [auth.authenWeb], async function (req, res, next) {
  try {
    const { id } = req.params;
    const categories = await categoryController.getCategoryByID(id);

    // Assuming categories.gender is a string
    const gender = categories.gender;

    // Set the 'selected' attribute based on the gender value
    const isNamSelected = gender === "Nam";
    const isNuSelected = gender === "Nữ";

    res.render('categories/edit', { categories, isNamSelected, isNuSelected });
  } catch (error) {
    next(error);
  }
});



//http://localhost:3000/cpanel/categories/:id/edit
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
    // let { name, gender, image, description } = body;
    const { id } = req.params;
    let { name, gender, image, description } = req.body;

    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `categories/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File successfully uploaded.');
    await categoryController.updateCategory(id, name, gender, downloadURL, description);
    return res.redirect('/cpanel/categories');
  } catch (error) {
    console.log('Update categories error: ', error);
    next(error);
  }
});

module.exports = router;