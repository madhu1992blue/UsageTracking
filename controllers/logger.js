var express = require('express')
  , router = express.Router();

var logHandler= require('../middlewares/LogHandler/LogHandler');
router.post('/', function(req, res){
    var projectName = req.body.name;
    var projectVersion = req.body.version;
    var projectPlatform = req.body.platform;
    logHandler.createNew(projectName, projectVersion, projectPlatform);
    res.json({'token':{'id': 1234}})
})

router.post('/step', function(req, res){
    var xmlName = req.body.xmlName;
    var step = req.body.step;
    var featureArea = req.body.featureArea;
    var subArea = req.body.subArea;
    var version = req.body.version;
    if(featureArea&&subArea&&version)
        logHandler.addStepToFeatureArea(xmlName,featureArea, subArea, version, step);
    else logHandler.addStep(xmlName, step);
    res.json({'success': true});
})

router.get('/:tokenid', function(req, res) {

	res.json({'tokenid': req.params.tokenid, 'error': false,}); 
});

module.exports = router;