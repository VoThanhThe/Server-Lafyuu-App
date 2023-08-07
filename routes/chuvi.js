var express = require('express');
var router = express.Router();

//http://localhost:3000/chu-vi/tron?r=5
router.post('/:loai', async function(req,res,next){
    const {tron} = req.params;
    const {r} = req.query;
    const chuvi = 2 * r * 3.14;
    res.json({ title: 'Express', result: chuvi });
});

module.exports = router;