const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");

const generateTokenAndSaveInCookies = async (userId, res) => {

  const token = jwt.sign(
    { userId: userId },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction, // true for production (HTTPS)
    sameSite: isProduction ? "none" : "lax", // "none" for cross-origin in production
    path: "/",
    maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
  });

  await User.findByIdAndUpdate(userId, { token });

  return token;
};

module.exports = { generateTokenAndSaveInCookies };
