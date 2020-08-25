const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next) => {
  let header, token;
  //check if user send token or not
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    res.status(401).send({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: "invalid token" });
  }
};
