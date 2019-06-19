const router = require('../node_modules/express').Router();

const  eventsController = require('../Controllers/eventsController');

router.post('/createevents', eventsController.createevent);
router.post('/createclusterevent', eventsController.createclusterevent);

//list all events
router.get('/getallevents', eventsController.getAllEvents);
//get event by id
router.get('/geteventbyid/:churchevents_id',  eventsController.geteventsbyid);
//edit event
router.post('/editevent',  eventsController.editEvent);



router.get('/listeventsspecificclusters/:clusters_id', eventsController.listeventsspecificclusters);
router.get('/listeventsspecifics/:churchgroups_id', eventsController.listeventsspecifics);


module.exports =router;
