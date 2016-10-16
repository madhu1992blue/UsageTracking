var express = require('express')
  , router = express.Router();

  
router.use('/users', require('./users'));
router.use('/logger', require('./logger'));

router.get('/', function(req, res) {
	res.json({'tokenid':'12345', 'error': false}); 
});

  
module.exports = router;