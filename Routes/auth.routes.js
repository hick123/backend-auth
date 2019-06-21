const router = require('../node_modules/express').Router();

const  authController = require('../Controllers/authController');
//post
router.post('/login',  authController.login);
router.post('/signup',  authController.signup);
//check email availablity
router.get('/checkemail/:email',  authController.checkemail);
//check username availablity
router.get('/checkusername/:username',  authController.checkusername);

//check username availablity
// router.get('/searchmember/:username',  authController.searchmember);


// router.post('/createevents', eventsController.createevent);
// router.post('/createclusterevent', eventsController.createclusterevent);

// //list all events
// router.get('/getallevents', eventsController.getAllEvents);

// router.get('/listeventsspecificclusters/:clusters_id', eventsController.listeventsspecificclusters);
// router.get('/listeventsspecifics/:churchgroups_id', eventsController.listeventsspecifics);


module.exports =router;
