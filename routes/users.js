var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');
var assert = require('assert');
var crypto = require('crypto');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/newuser', function(req, res, next) {
    var url = 'mongodb://localhost:27017/test';
    var db=mongo.db(url,{native_parser:true});

        console.log("Connected correctly to server.");

        var md5 = crypto.createHash("md5");
        var password = md5.update(req.body.password).digest("hex");
        db.collection("users").insert({username:req.body.username,password:password},function(err,result){
            if(err){
                console.log("注册插入数据失败");
            }
            else{
                res.send('注册成功'+result);
                db.close();
            }
        });



});

router.post('/olduser', function(req, res, next) {
    var url = 'mongodb://localhost:27017/test';
    var db=mongo.db(url,{native_parser:true});

    console.log("Connected correctly to server.");

    db.collection('users').findOne({ "username": req.body.username },function (err, docs) {
            console.log(docs);

            if (!err) {
                var md5 = crypto.createHash("md5");
                var password = md5.update(req.body.password).digest("hex");
                if (password == docs.password) {
                    res.send('登录成功');
                }
                else {
                    res.send("密码错误");
                }
            }
            else {
                console.log("错误 "+err);
            }
            db.close();
        });




});


module.exports = router;
