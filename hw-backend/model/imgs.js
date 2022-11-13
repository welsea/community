const mongoose = require('mongoose');

//schema
var imgsSchema= new mongoose.Schema({
    name:String,
    artist:String,
    kudos:Number
})

var imgsModel= mongoose.model('imgs', imgsSchema);
module.exports=imgsModel;