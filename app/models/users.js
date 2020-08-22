const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true },  //用户名称
        pwd:{type:String},
    },
);

module.exports = model("Users", userSchema);
