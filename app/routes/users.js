const Router = require("koa-router");
const {secret} = require('../secret');
const jwt = require('koa-jwt')({ secret:secret});
const router = new Router({ prefix: "/users" });  // 路由前缀
const {find,findStatus} = require("../controllers/users");
router.post("/login",find);  // 验证用户身份信息
router.post("/loginstatus", jwt,findStatus);  // 验证用户身份信息
module.exports = router;