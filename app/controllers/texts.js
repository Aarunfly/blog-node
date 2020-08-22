
const Texts = require("../models/texts");
const Visit = require("../models/visit");
let visitNumber = 0;
class TextsController {
    //返回博客详情页
    async find(ctx) {  // 返回所有博客文章
        const{visit} = ctx.request.body;
        await Visit.find().then(res =>    {
                visitNumber = res[0].visitNum
            if(visit === "true"){
                visitNumber++
            }
            }
        );
        await  Visit.updateOne({pathname:"/"},{$set:{visitNum:visitNumber}});
        await Texts.find().then(res => {
            if(res){
                if(res.length >= 5){
                    ctx.body = {
                        texts: res.reverse().slice(0,5),
                        visit:visitNumber,
                    }
                }else {
                    ctx.body = {
                        texts: res.reverse(),
                        visit:visitNumber,
                    }
            }
            }else {
                ctx.body = {
                    status:"400",
                    msg: "获取失败"
                }
            }
        });
    }

    // 查询博客文章
    async findone(ctx) {  // 查询博客文章
        ctx.verifyParams({
            id:{type:"string",required:true}
        });

        const{ id} = ctx.request.body;
        const detail = await Texts.find({"_id":id});
        if(detail){
            ctx.body = detail
        }else {
            ctx.throw(409,"文章不存在")
        }

    }


    //创建博客文章
    async Createtext(ctx) {
        ctx.verifyParams({
            title:{type:"string",required:true},
            date:{type:"string",required:true},
            content:{type:"string",required:true},
            //422报错 原因传来的值为空，将图片上传地址改为本地解决问题
            backPic:{type:"string",required:false},
            label:{type:"object"}
        });

        const detail = await new Texts({...ctx.request.body}).save();
        if(detail){
            // ctx.body = detail
            ctx.body = {
               status:"successful",
                msg:"添加成功"
            }
        }else {
            ctx.throw(409," 增加失败")
        }
    //
    }
}

module.exports = new TextsController();

