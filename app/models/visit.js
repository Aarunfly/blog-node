const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const visitSchema = new Schema(
    {
        pathname: { type: String },  //页面路径
        visitNum:{type:Number},//页面访问量
    },
);

module.exports = model("Visit", visitSchema);