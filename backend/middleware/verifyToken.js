import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.token_userId = payload.id;
    req.token_userRoles = payload.roles;

    next();
  });
};

export default verifyToken;
