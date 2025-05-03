const express = require('express'); const router = express.Router(); const jobController = require('../controllers/jobController');

router.post('/create', jobController.createJob);

module.exports = router;
