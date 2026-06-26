const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log("Token:", token); // Debugging line to check the token value

  if (!token) {
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified Token:", verified); // Debugging line to check the verified token
    req.user = verified;
    next();
    console.log("After next()"); // This line will not execute if next() is called
  } catch (err) {
    console.log(err); // Debugging line to check the error
    return res.status(400).json({
      message: "Invalid Token"
    });
  }
};

module.exports = verifyToken;