// const router = require('../node_modules/express').Router();
const router = require('../node_modules/express').Router();

const  eventsController = require('../Controllers/eventsController');

router.post('/createevents', eventsController.createevent);
router.post('/createclusterevent', eventsController.createclusterevent);

//list all events
router.get('/getallevents', eventsController.getAllEvents);

router.get('/listeventsspecificclusters/:clusters_id', eventsController.listeventsspecificclusters);
router.get('/listeventsspecifics/:churchgroups_id', eventsController.listeventsspecifics);


module.exports =router;
