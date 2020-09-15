import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({
      message: "access denied",
    });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      error: "invalid token",
    });
  }
};

export default verifyToken;
