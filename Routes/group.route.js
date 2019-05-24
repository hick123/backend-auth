const router = require('../node_modules/express').Router();

const  groupsController = require('../Controllers/groupsController');

router.post('/createchurchgroups', groupsController.createGroup);
// router.post('/addmemberstogroup', groupsController.addMembersToGroups);
router.get('/getchurchgroups', groupsController.getchurchgroups);
router.get('/getchurchbyid/:churchgroups_id', groupsController.getchurchbyid);
router.get('/getchurchgroupmembers/:churchgroups_id', groupsController.getchurchgroupmember);

router.post('/addtochurchgroup', groupsController.addtochurchgroup);


module.exports =router;
