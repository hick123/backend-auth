const router = require('../node_modules/express').Router();

const  membersController = require('../Controllers/membersController');

//member routes
//get
router.get('/',  membersController.list);
router.get('/newmembers',  membersController.newmembers);
//get member prifole details
router.post('/getloggedinmemberbyid',  membersController.getLoggedInMemberById);

//get member //get member ministries details
router.post('/getloggedinmemberbyidministry',  membersController.getLoggedInMemberByIdMinistries);

router.get('/getmemberbyid/:member_id',  membersController.getmemberbyid);

//check email availablity
router.get('/checkemail/:email',  membersController.checkemail);
//check username availablity
router.get('/checkusername/:username',  membersController.checkusername);

//check username availablity
router.get('/searchmember/:username',  membersController.searchmember);

//activate member
router.post('/activatemember',  membersController.activateMember);


//update profile 
router.post('/updateprofile', membersController.editprofile)



//post
router.post('/login',  membersController.login);
router.post('/signup',  membersController.signup);

router.get('/update/:id',  membersController.edit);
router.post('/update/:id',  membersController.update);
router.get('/delete/:id',  membersController.delete);

module.exports = router;
