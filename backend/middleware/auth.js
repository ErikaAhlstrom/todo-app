const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Skapar ny prop på req
    req.user = verified.user;

    next();
  } catch (err) {
    res.staus(401).json({ errorMessage: 'Unauthorized' });
  }
}

module.exports = auth;
