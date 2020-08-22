const Router = require("koa-router");
const router = new Router({ prefix: "/texts" });  // 路由前缀
const {secret} = require('../secret');
const jwt = require('koa-jwt')({ secret:secret});
const {find,findone,Createtext} = require("../controllers/texts");
router.post("/alltext",  find);  // 返回首页博客
router.post("/detail", findone);//返回博客详情
router.post("/newblog",jwt, Createtext);//返回博客详情
module.exports = router;

