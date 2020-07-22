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
                .exec((err, videos) => res.json(videos))
        })
    },
    update(req, res) {
        const idParams = req.params.id;
        let videos= req.body;

        videosModel.updateOne({
            _id: idParams
        }, {
            ...videos
        }, (err, updated) => {
            res.json(updated);
        })
    },
    remove(req, res) {
        const idParams = req.params.id;

        videosModel.findOne({
            _id: idParams
        }).remove((err, removed) => res.json(idParams))
    }
}

module.exports = videosController;