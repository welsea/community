var msgsModel = require('../model/msgs');

/* GET msgs listing. */
const msgsController = {
    all(req, res) {
        msgsModel.find({}).sort({ _id:-1})
            .exec((err, msgs) => res.json(msgs))
    },
    sortBy(req,res){
        msgsModel
            .find({}).sort({kudos:-1})
            .exec((err,msgs)=>res.json(msgs));
    },
    limitReturn(req,res){
        msgsModel
            .find({}).sort({kudos:-1}).limit(3)
            .exec((err,msgs)=>res.json(msgs));
    },
    create(req, res) {
        const requestBody = req.body;
        const newMsg = new msgsModel(requestBody);

        newMsg.save((err, saved) => {
            msgsModel
                .findOne({
                    _id: newMsg._id
                })
                .exec((err, msg) => res.json(msg))
        })
    },
    update(req, res) {
        const idquery = req.query.id;
        let msg= req.body;

        msgsModel.updateOne({
            _id: idquery
        }, {
            ...msg
        }, (err, updated) => {
            res.json(updated);
        })
    },
    remove(req, res) {
        const idquery = req.query.id;

        msgsModel.findOne({
            _id: idquery
        }).remove((err, removed) => res.json(idquery))
    }
}

module.exports = msgsController;