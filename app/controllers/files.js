const fs =require('fs');
const path = require("path");
class FilesController {

    async upload(ctx) {

        const file  = ctx.request.files.file;

        //创建可读流
        const reader = fs.createReadStream(file.path);
        //修改文件的名称
        var myDate = new Date();
        var newFilename =file.name.split(',')[0]+'_'+myDate.getTime()+'.'+file.name.split('.')[1];
        var targetPath = path.join(__dirname,'../../../usr/local/blogpic/blog')+`/${newFilename}`;
       // var targetPath = path.join(__dirname,'../upload')+`/${newFilename}`;
        //创建可写流
        const upStream = fs.createWriteStream(targetPath);
        reader.pipe(upStream);


        // //返回保存的路径
        ctx.body = newFilename

    }
}

module.exports = new FilesController();

