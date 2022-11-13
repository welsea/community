const express = require('express');
const router = express.Router();
const notesController = require('../../controllers/notes');
const imgsController = require('../../controllers/imgs');
const ficsController = require('../../controllers/fics');
const msgsController = require('../../controllers/msgs');
const videosController = require('../../controllers/videos');



//notes
router.get('/notes', notesController.all);
router.get('/notes/commend',notesController.limitReturn);
router.get('/note', notesController.byId);
router.post('/note/add', notesController.create);
router.put('/note/update', notesController.update);
router.delete('/note/delete', notesController.remove);

//imgs
router.get('/imgs', imgsController.all);
router.get('/imgs/sort', imgsController.sortBy);
router.get('/imgs/commend',imgsController.limitReturn);
router.get('/imgs/find',imgsController.find);
router.get('/img', imgsController.byId);
router.post('/img/add', imgsController.create);
router.put('/img/update', imgsController.update);
router.delete('/img/delete', imgsController.remove);

//fic
router.get('/fics', ficsController.all);
router.get('/fics/sort', ficsController.sortBy);
router.get('/fics/commend',ficsController.limitReturn);
router.get('/fics/find',ficsController.find);
router.get('/fic', ficsController.byId);
router.post('/fic/add', ficsController.create);
router.put('/fic/update', ficsController.update);
router.delete('/fic/delete', ficsController.remove);

//video

router.get('/videos', videosController.all);
router.get('/videos/sort', videosController.sortBy);
router.get('/videos/commend',videosController.limitReturn);
router.get('/videos/find',videosController.find);
router.get('/video', videosController.byId);
router.post('/video/add', videosController.create);
router.put('/video/update', videosController.update);
router.delete('/video/delete', videosController.remove);

//msg
router.get('/msgs', msgsController.all);
router.get('/msgs/sort', msgsController.sortBy);
router.get('/msgs/commend',msgsController.limitReturn);
// router.get('/msgs/:id', msgsController.byId);
router.post('/msg/add', msgsController.create);
router.put('/msg/update', msgsController.update);
router.delete('/msg/delete', msgsController.remove);


module.exports = router;