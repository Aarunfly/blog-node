const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const textSchema = new Schema(
    {
            title: { type: String, required: true },  //文章名称
            date:{type:String},
            content: { type: String },  // 内容
            introduce:{type:String}, //简介
            backPic:{type:String},
            label:{type:Array},

    },
);

module.exports = model("Texts", textSchema);

