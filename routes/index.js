var express = require('express');
var router = express.Router();

const userController = require('../component/users/UserController');
const productController = require('../component/product/ProductController');
const jwt = require('jsonwebtoken');
const auth = require('../middle/Authen');

/* GET home page. */
//http://localhost:3000
//http://localhost:3000/?a=1&b=2&c=3
//http://localhost:3000
router.get('/', [auth.authenWeb] ,async function(req, res, next) {
  //hiển thị trang chủ
  const products = await productController.getAllProduct();
  res.render('product/list',{products});
  //res.render('product/list');
});
//http://localhost:3000/login
router.get('/login', [auth.authenWeb], async function(req, res, next) {
  //hiển thị trang login
  res.render('user/login');
});
//http://localhost:3000/login
router.post('/login', async function(req, res, next) {
  //xử lý login
  //nếu thành công chuyển sang trang chủ
  //ngược lại vẫn ở login

  const {email,password} = req.body;
  const result = await userController.login(email,password);
  //lưu thông tin vào session
  if(result){
    const token = jwt.sign({_id: result._id, role: result.role}, 'secret');
    req.session.token = token;
    return res.redirect('https://lafyuu-shop.onrender.com/home');
  }else{
    return res.redirect('https://lafyuu-shop.onrender.com/login');
  }
});

router.get('/home', [auth.authenWeb], async function(req, res, next) {
  //hiển thị trang chủ
  res.render('./product/home');
});
router.get('/table', async function(req, res, next) {
  //hiển thị trang chủ
  res.render('./product/list');
});
router.get('/detail', [auth.authenWeb], async function(req, res, next) {
  //hiển thị trang chủ
  res.render('./product/detail');
});
router.get('/form', [auth.authenWeb], async function(req, res, next) {
  //hiển thị trang chủ
  res.render('./user/form');
});

// https://lafyuu-shop.onrender.com/logout
router.get('/logout', [auth.authenWeb], async function(req, res, next) {
  //hiển thị trang chủ
  req.session.destroy();
  res.redirect('https://lafyuu-shop.onrender.com/login');
});
module.exports = router;

/**
 * req,res,next
 * req: request - từ client gửi lên
 * -req.query: lấy dữ lieuj từ query string
 * (sau dấu ?) 
 * -req.body: lấy dữ liệu từ form
 * -req.params: lấy dữ liệu từ url
 */

/**
 * HTTP Request Methods
 * GET - Read (Gõ link trên trình duyệt)
 * POST - Create
 */