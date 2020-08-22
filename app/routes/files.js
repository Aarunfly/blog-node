const Router = require("koa-router");
const router = new Router({ prefix: "/files" });  // 路由前缀
const {secret} = require('../secret');
const jwt = require('koa-jwt')({ secret:secret});
const {upload} = require("../controllers/files");
router.post("/blog",upload);  // 返回首页博客
module.exports = router;

