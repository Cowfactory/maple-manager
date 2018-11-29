const RateLimit = require('express-rate-limit');

const loginLimiter = new RateLimit({
    windowMs: 5*60*1000, // 5 minutes
    max: 5,
    delayMs: 0, // disabled
    message: "Maximum login attempts exceeded. Please try again later."
});

module.exports = loginLimiter