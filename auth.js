const router = require("express").Router();
const User = require("../models/User");
const Operator = require("../models/Operator");
const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");


//REGISTER
router.post("/register", async (req, res) => {

  Operator.findOne({_id:req.body.operator})
  .then((operatocheck) => {
    const newUser = new User({
      name:req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
      operator: operatocheck,
      dateofbith:req.body.dateofbith
    });
    newUser.save()
    .then((savedUser) =>  res.status(201).json(savedUser))
    .catch((err) => res.status(500).json(err));
  })
  .catch((err) =>  res.status(500).json(err));

 
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate('operator');
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Logout route
router.post("/logout",verifyToken,(req, res) => {

  res.clearCookie("accessToken"); // If using cookies


  // Respond with a success message
  res.status(200).json({ message: "Logout successful" });
});
router.post("/verifyToken", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "You are not authenticated!", isValid: false });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid", isValid: false });
      }

      return res.status(200).json({ message: "Token is valid", isValid: true });
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ message: "Internal Server Error", isValid: false });
  }
});

module.exports = router;
