const express = require('express');
const mathController = require('../controllers/mathController');

const router = express.Router();

router.post('/addition', mathController.addition);
router.get('/factorial/:number', mathController.factorial);
router.get('/fibonacci/:count', mathController.fibonacci);

module.exports = router;
