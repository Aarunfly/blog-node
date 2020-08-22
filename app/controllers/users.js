const Users = require("../models/users");
const jsonwebtoken = require("jsonwebtoken");
const {secret} = require('../secret');
class UsersController {
    async find(ctx) {  // 返回所有博客文章
        ctx.verifyParams({
            username:{type:"string",required:true},
            pwd:{type:"string",required:true},
        });
        let {username,pwd} = ctx.request.body;
        await Users.find({...ctx.request.body}).then(res=>{
            let agm = res[0];

            // if(agm.username === username && agm.pwd === pwd){
            if(agm){
                ctx.body={
                    status:"200",
                    msg:"登陆成功",
                    // 加密userToken

                    token: jsonwebtoken.sign({ ...agm }, secret, { expiresIn: '1h' })
                }
            }else {
                ctx.body={
                    status:"400",
                    msg:"用户不存在！",
                }
            }
        });
        // if(loginStatus){
        //     ctx.body =
        // }else{
        //
        // }
    }//返回博客详情页
    async findStatus(ctx) {  // 返回所有博客文章

        await Users.find().then(res=> {
            ctx.body=res;
        })
    }//返回博客详情页
}

module.exports = new UsersController();