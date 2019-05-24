const router = require('../node_modules/express').Router();

const  membersController = require('../Controllers/membersController');

//member routes
//get
router.get('/',  membersController.list);
router.get('/newmembers',  membersController.newmembers);
router.get('/getmemberbyid/:member_id',  membersController.getmemberbyid);

//post
router.post('/login',  membersController.login);
router.post('/signup',  membersController.signup);

router.get('/update/:id',  membersController.edit);
router.post('/update/:id',  membersController.update);
router.get('/delete/:id',  membersController.delete);

module.exports = router;
