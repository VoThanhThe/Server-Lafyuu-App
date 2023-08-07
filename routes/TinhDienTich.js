var express = require('express');
var router = express.Router();

//http://localhost:3000/dien-tich/tron?r=5
router.get('/dien-tich/:tron', async function(req,res,next){
    const {tron} = req.params;
    const {r} = req.query;
    const dienTich = r*r * 3.14;
    res.render('tinh_toan', { title: 'Express', result: dienTich });
});

module.exports = router;