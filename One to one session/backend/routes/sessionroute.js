const express = require('express');
const { createSession,validateSession,handleSignal} = require('../controllers/sessioncont'); // Adjust path as needed

const router = express.Router();

router.route('/create-session').post(createSession);
router.route('/session/:sessionId').get(validateSession);
router.route('/session/:sessionId/signal').post(handleSignal);


module.exports = router;