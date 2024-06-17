const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
require("dotenv").config();
//sign up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    //checking username lengt greater then 3

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username lenght should be greater than 3" });
    }
    //user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "username already exists" });
    }
    //check email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    //checking password lenght less than 6
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 5" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    //creating new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "signup Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//sign in
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid Credential" });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      const authClaims = [
        { name: existingUser.username },
        { role: existingUser.role },
      ];
      if (data) {
        const token = jwt.sign({ authClaims }, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
          message: "signin successfull",
        });
        // res.status(200).json({message:"Sigin Success"})
      } else {
        res.status(400).json({ message: "Invalid Credential" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//get user info
router.get("/get-user-info", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
