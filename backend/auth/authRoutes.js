// auth/authRoutes.js
const express = require('express');
const bodyParser = require('body-parser');
const { sendVerificationCode, verifyPhoneNumber } = require('./authController');

const router = express.Router();
router.use(bodyParser.json());

router.post('/sendVerificationCode', sendVerificationCode);
router.post('/verifyPhoneNumber', verifyPhoneNumber);

module.exports = router;
