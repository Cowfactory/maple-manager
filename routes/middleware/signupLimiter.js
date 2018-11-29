const RateLimit = require('express-rate-limit');

const signupLimiter = new RateLimit({
    windowMs: 60*60*1000, // 60 minutes
    max: 3,
    delayMs: 0, // disabled
    message: "Maximum accounts created. Please try again later."
});

module.exports = signupLimiter