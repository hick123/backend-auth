const router = require('../node_modules/express').Router();
const  clustersController = require('../Controllers/clustersController');

router.post('/createcluster', clustersController.createcluster);
router.get('/getclusters', clustersController.getclusters);
router.get('/getclusterbyid/:clusters_id', clustersController.getclusterbyid);
router.get('/getclustermbers/:clusters_id', clustersController.getcluctermembers);

router.post('/addmemberstocluster', clustersController.addmemberstocluster);

router.post('/getclustersenrolled', clustersController.getclustersEnrolled);
 
module.exports =router;
