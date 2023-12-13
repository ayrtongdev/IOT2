// auth/authController.js
const twilio = require('twilio');

const accountSid = 'AC638a7170184624085e24e4cf440afdfc';
const authToken = 'dda94123d3fd176e12bdfa2c64a60e9f';
const client = new twilio(accountSid, authToken);

const sendVerificationCode = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const verification = await client.verify.services('VA95df4be26bf6d8554039009c34db6579')
      .verifications.create({ to: phoneNumber, channel: 'sms' });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send verification code.' });
  }
};

const verifyPhoneNumber = async (req, res) => {
  const { phoneNumber, code } = req.body;

  try {
    const verificationCheck = await client.verify.services('VA95df4be26bf6d8554039009c34db6579')
      .verificationChecks.create({ to: phoneNumber, code });

    res.json({ isVerified: verificationCheck.status === 'approved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify phone number.' });
  }
};

module.exports = { sendVerificationCode, verifyPhoneNumber };
