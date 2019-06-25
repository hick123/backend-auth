const router = require('../node_modules/express').Router();

const  contributionController = require('../Controllers/contributionController');


router.post('/addcontribution', contributionController.addContribution);

//get list members with contributions group with sum(amount)
router.get('/allContributions', contributionController.allContributions);


// router.get('/groupcontributions', contributionController.groupedContributions);

//get members contributions in there respective groups
router.get('/contributionwithgroups', contributionController.contributionWithGroups);

//get members contributions in there respective clusters
router.get('/contributionwithclusters', contributionController.contributionWithClusters);




module.exports=router;
