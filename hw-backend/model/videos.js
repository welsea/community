const mongoose = require('mongoose');

//schema
var videosSchema= new mongoose.Schema({
    bv:String,
    name:String,
    owner:String,
    desc:String,
    face:String,
    kudos:Number
})

var videosModel= mongoose.model('videos', videosSchema);
module.exports=videosModel;