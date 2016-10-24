var express = require('express')
    , router = express.Router();

var logHandler = require('../middlewares/LogHandler/LogHandler');
router.post('/', function (req, res) {
    var projectName = req.body.name;
    var projectVersion = req.body.version;
    var projectPlatform = req.body.platform;
    id = logHandler.createNew(projectName, projectVersion, projectPlatform);
    console.log(id);
    res.json({ 'token': { 'id': id } })
});

router.post('/step', function (req, res) {
    var step = req.body.step;
    var tokenId = req.body.tokenId;
    var featureArea = featureArea;
    var subArea = subArea;
    var version = version;
    //logHandler.addStepToFeatureArea(tokenId, featureArea, subArea, version, step);
    if (featureArea && subArea && version)
        logHandler.addStepToFeatureArea(tokenId, featureArea, subArea, version, step);
    else
        logHandler.addStep(tokenId, step);
    res.json({ 'success': true });
});

router.post('/analytics', function(req, res){
    var featureArea = req.body.featureArea;
    var subArea = req.body.subArea;
    var version = req.body.version;
    return res.json({sequences: logHandler.findSteps(featureArea, subArea, version)});

});

router.get('/:tokenid', function (req, res) {

    res.json({ 'tokenid': req.params.tokenid, 'error': false, });
});


module.exports = router;