const mongoose = require('mongoose');

//schema
var msgsSchema= new mongoose.Schema({
    name:String,
    content:String,
    avatar:String,
    kudos:Number

})

var msgsModel= mongoose.model('msgs', msgsSchema);
module.exports=msgsModel;