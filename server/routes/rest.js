var express = require('express')
  , router = express.Router();

router.get('/api/data', (req, res) => {
  res.json({"zehr": "gut"})
});

module.exports = router;