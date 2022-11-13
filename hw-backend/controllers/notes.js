var notesModel = require('../model/notes');

/* GET notes listing. */
const notesController = {
    all(req, res) {
        notesModel.find({}).sort({ _id:-1})
            .exec((err, notes) => res.json(notes))
    },
    limitReturn(req,res){
        notesModel
            .find({}).limit(5)
            .exec((err,notes)=>res.json(notes));
    },
    byId(req,res){
        const id=req.query.id;
        notesModel.findOne({_id:id})
            .exec((err, note) => res.json(note))
    },
    create(req, res) {
        const requestBody = req.body;
        const newNote = new notesModel(requestBody);

        newNote.save((err, saved) => {
            notesModel
                .findOne({
                    _id: newNote._id
                })
                .exec((err, note) => res.json(note))
        })
    },
    update(req, res) {
        const idquery = req.query.id;
        let note= req.body;

        notesModel.updateOne({
            _id: idquery
        }, {
            ...note
        }, (err, updated) => {
            res.json(updated);
        })
    },
    remove(req, res) {
        const idquery = req.query.id;

        notesModel.findOne({
            _id: idquery
        }).remove((err, removed) => res.json(idquery))
    }
}

module.exports = notesController;