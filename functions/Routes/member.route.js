const router = require('../node_modules/express').Router();

const  membersController = require('../Controllers/membersController');
const authMiddleware = require('./Middlewares/auth');


//member routes
//get
router.get('/',  membersController.list);
router.get('/newmembers', membersController.newmembers);
//get member prifile details
router.post('/getloggedinmemberbyid',  membersController.getLoggedInMemberById);

router.get('/getmemberbyid/:member_id',  membersController.getmemberbyid);

//check email availablity
router.get('/checkemail/:email',  membersController.checkemail);
//check username availablity
router.get('/checkusername/:username',  membersController.checkusername);

//activate member
router.post('/activatemember',  membersController.activateMember);




//post
router.post('/login',  membersController.login);
router.post('/signup',  membersController.signup);

router.get('/update/:id',  membersController.edit);
router.post('/update/:id',  membersController.update);
router.get('/delete/:id',  membersController.delete);

module.exports = router;
