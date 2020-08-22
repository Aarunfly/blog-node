const mongoose = require('mongoose').set('debug', true);
const options = {
    // autoReconnect: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
};

// username 数据库用户名
// password 数据库密码
// localhost 数据库ip
// dbname 数据库名称
const url = 'mongodb://admin:615522653@39.107.251.85:27017/admin';
// const url = 'mongodb://admin:615522653@172.17.249.115:27017/admin?authSource = admin';
module.exports = {

    connect: ()=> {
        mongoose.connect(url,options,function(err){

            if(err){

                console.log('Connection Error:' + err)

            }else{

                console.log('Connection success!') }

        });
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, '连接错误:'));
        db.once('open', ()=> {
            console.log('mongodb connect suucess');
        })
    }
};
