var videosModel = require('../model/videos');

/* GET videos listing. */
const videosController = {
    all(req, res) {
        videosModel.find({}).sort({ _id:-1})
            .exec((err, videos) => res.json(videos))
    },
    find(req, res){
        const keyword=req.query.kw;
        videosModel.find({name:{ $regex: '.*' + keyword + '.*' } }).sort({ _id:-1})
            .exec((err, videos) => res.json(videos))
    },
    byId(req,res){
        const id=req.query.id;
        videosModel.findOne({_id:id})
            .exec((err, video) => res.json(video))
    },
    sortBy(req,res){
        videosModel
            .find({}).sort({kudos:-1})
            .exec((err,videos)=>res.json(videos));
    },
    limitReturn(req,res){
        videosModel
            .find({}).sort({kudos:-1}).limit(3)
            .exec((err,videos)=>res.json(videos));
    },
    create(req, res) {
        const requestBody = req.body;
        const newVideo = new videosModel(requestBody);

        newVideo.save((err, saved) => {
            videosModel
                .findOne({
                    _id: newVideo._id
                })
                .exec((err, video) => res.json(video))
        })
    },
    update(req, res) {
        const idquery = req.query.id;
        let video= req.body;

        videosModel.updateOne({
            _id: idquery
        }, {
            ...video
        }, (err, updated) => {
            res.json(updated);
        })
    },
    remove(req, res) {
        const idquery = req.query.id;

        videosModel.findOne({
            _id: idquery
        }).remove((err, removed) => res.json(idquery))
    }
}

module.exports = videosController;