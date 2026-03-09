const User = require("../model/user.model.js");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { generateTokenAndSaveInCookies } = require("../token/jwt.js");

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const register = async (req, res) => {
  try {
    const validation = userSchema.safeParse(req.body);

    if (!validation.success) {
      const errors = validation.error.issues.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const { username, email, password } = validation.data;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await generateTokenAndSaveInCookies(newUser._id, res);

res.status(201).json({
  message: "User registered successfully",
  user: {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  },
  token,
});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await generateTokenAndSaveInCookies(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", { path: "/" });

    res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

module.exports = { register, login, logout };