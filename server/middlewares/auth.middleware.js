import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Error in AuthMiddleware:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
