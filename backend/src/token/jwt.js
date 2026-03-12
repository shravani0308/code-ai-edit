const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authenticate = async (req, res, next) => {
  try {
    // Try to get token from cookie first, then from Authorization header
    let token = req.cookies.jwt;
    console.log("Cookie token:", token ? "Found" : "Not found");
    
    if (!token) {
      const authHeader = req.headers.authorization;
      console.log("Auth header:", authHeader ? "Found" : "Not found");
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
        console.log("Bearer token extracted:", token ? "Success" : "Failed");
      }
    }

    if (!token) {
      console.log("No token found in cookies or headers");
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      console.log("Token verification failed");
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("User not found for token");
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { user };
    next();

  } catch (error) {
    console.log("Error in authenticate middleware:", error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = { authenticate };
