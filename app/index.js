const Koa = require("koa");
const path = require("path");
const koaBody = require("koa-body");
// const koaStatic = require("koa-static");
const parameter = require("koa-parameter");
const error = require("koa-json-error");
const routing = require("./routes");
const app = new Koa();
const mongoConf = require('./config');
const cors = require('koa2-cors');
const koajwt = require('koa-jwt');
const {secret} = require('./secret');
mongoConf.connect();
// app.use(koaStatic(path.join(__dirname, "public")));  // 静态资源
// app.use(koaStatic('./'));
app.use( error({
        postFormat: (e, { stack, ...rest }) =>
            process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
    }));
// 处理post请求和图片上传
app.use(koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, "/upload"),
            keepExtensions: true
        }
    }));
app.use(parameter(app));  // 参数校验
// 这个是json错误处理，可以自动抛出http status 422
app.use(
    error({ postFormat: (e, { stack, ...rest }) => ({ stack, rest }) })
);
app.use(cors({
    origin: function(ctx) {
        console.log(ctx.url);
        if(ctx.url==='/'){
            return "*";
        }
        // return 'https://joneyf.cn';
        return '*';
    }, // 允许发来请求的域名

    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type',  'X-Requested-With','Authorization', 'Accept'],
    credentials: true, // 标示该响应是合法的
}));
routing(app);  // 路由处理
app.use(async (ctx, next) => {

    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                msg: err.message
            }
        } else {
            throw err;
        }
    })
});

app.use(koajwt({ secret:secret}).unless({
    // 登录接口不需要验证
    path: [/^\/login/,/^\/files/]
}));

app.listen(3000, () => console.log("程序启动在3000端口了"));

