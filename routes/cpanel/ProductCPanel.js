const express = require('express');
const router = express.Router();
const productController = require('../../component/product/ProductController');
const categoryController = require('../../component/categories/CategoryController');
const uploadFile = require('../../middle/UploadFile');
const CONFIG = require('../../config/Config');
const auth = require('../../middle/Authen');

//http://localhost:3000/cpanel/product/
router.get('/', [auth.authenWeb], async function(req, res, next) {
    const products = await productController.getAllProduct();
    res.render('./product/list',{products});
  });
//http://localhost:3000/cpanel/product/:id/delete
router.get('/:id/delete', [auth.authenWeb], async function(req, res, next) {
  try {
    const {id} = req.params;
    await productController.deleteProductByID(id);
    res.json({status: true});
  } catch (error) {
    res.json({status: false});
  }
    
  });

  //http://localhost:3000/cpanel/product/new
  //hien thi trang them moi san pham
router.get('/new', [auth.authenWeb], async function(req, res, next) {
  const categories = await categoryController.getAllCategory();
  res.render('user/form', {categories});
});

  //http://localhost:3000/cpanel/product/new
  //xu li them moi san pham
  router.post('/new', [uploadFile.single('image'),] , async function(req, res, next) {
    try {
        //ipconfig
      let {body, file} = req;
      if(file){
        let image = `${CONFIG.CONTANTS.IP}images/${file.filename}`;
        body = {...body, image: image};
      }
      let {name,price,quantity,image,category} = body;
      console.log(image);
      await productController.addNewProduct(name,price,quantity,image,category);
      return res.redirect('/cpanel/product');
    } catch (error) {
      console.log('Add new product error: ', error);
      next(error);
    }
  });
  

  //http://localhost:3000/cpanel/product/
  //hien thi trang cap nhat san pham
router.get('/:id/edit', [auth.authenWeb], async function(req, res, next) {
  try {
    const {id} = req.params;
    const product = await productController.getProductByID(id);
    let categories = await categoryController.getAllCategory();
    for(let index = 0; index < categories.length; index++){
      const element = categories[index];
      categories[index].selected = false;
      if(element._id.toString() == product.category.toString()){
        categories[index].selected = true;
      }
    }
    res.render('product/edit', {product, categories});
  } catch (error) {
    next(error);
  }
});


//http://localhost:3000/cpanel/product/:id/edit
  //xu li cap nhat san pham
  router.post('/:id/edit', [uploadFile.single('image'),] , async function(req, res, next) {
    try {
        //cmd >>>>  ipconfig >>>>>>>>> IPv4 Address;
        let {id} = req.params;
      let {body, file} = req;
      if(file){
        let image = `${CONFIG.CONTANTS.IP}images/${file.filename}`;
        body = {...body, image: image};
      }
      let {name,price,quantity,image,category} = body;
      await productController.updateProduct(id,name,price,quantity,image,category);
      return res.redirect('/cpanel/product');
    } catch (error) {
      console.log('Update product error: ', error);
      next(error);
    }
  });

module.exports = router;