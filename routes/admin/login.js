var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var bodyParser = require('body-parser');
var md5=require('md5-node'); /*md5加密*/

var DAO = require('../../data-access').DAO; /*引入DB数据库*/

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get('/',function(req,res){
    //res.send('登录页面');
    res.render('admin/login');

})
//处理登录的业务逻辑
router.post('/doLogin',function(req,res){

    //res.send('login');
    console.log(req.body); /*获取post提交的数据*/


    //req.body ={ username: 'admin', password: '123456' }
    var username = req.body.username
    var password = md5(req.body.password)

    //1.获取数据

    //2.连接数据库查询数据
    DAO.find(DAO.userCollName, {
        username: username,
        password: password
    }, function (err, data) {
        //保存用户信息
        if (!err && data) {
            req.session.userinfo = data[0];
            res.redirect('/admin/product'); /*登录成功跳转到商品列表*/
        } else {
            res.send("<script>alert('登录失败');location.href='/admin/login'</script>");
        }
    });



})


router.get('/loginOut',function(req,res){


    //销毁session

    req.session.destroy(function(err){

        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/login');
        }
    })
})


module.exports = router;   /*暴露这个 router模块*/