const express = require('express');
const router = express.Router();
const push_ctrl = require('../controllers/push/index');

router.post('/push.send', push_ctrl.send);

module.exports = router;