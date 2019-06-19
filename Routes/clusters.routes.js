const router = require('../node_modules/express').Router();
const  clustersController = require('../Controllers/clustersController');

router.post('/createcluster', clustersController.createcluster);
router.get('/getclusters', clustersController.getclusters);
router.get('/getclusterbyid/:clusters_id', clustersController.getclusterbyid);
router.get('/getclustermbers/:clusters_id', clustersController.getcluctermembers);

// router.get('/select', clustersController.select);


router.post('/addmemberstocluster', clustersController.addmemberstocluster);

router.post('/clustersenroll', clustersController.getclustersEnrolled);

//unenroll member form cluster
 
router.get('/clustersenroll/:member_id', clustersController.unEnrolledFromCluster);
router.get('/getclustersenrolled/:member_id', clustersController.getclustersEnrolled);


module.exports =router;
