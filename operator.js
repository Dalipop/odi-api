const Operator = require("../models/Operator");
const upload = require('../routes/upload');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//REGISTER
router.post("/register", verifyToken,async (req, res) => {

const { name, logo, country } = req.body;
const existingOperator = await Operator.findOne({name,country});
  if (existingOperator) {
    return res.status(400).json({
      message: "An operator with the same name and country already exists."
    });
  }else{
  try {
    const newOperator = new Operator({
      name: req.body.name,
      logo:req.body.logo,
      country:req.body.country

    });
    
      const savedOperator = await newOperator.save();
      res.status(201).json(savedOperator);
    } catch (err) {
      res.status(500).json(err);
    }
  }
    
  });
// Get all operators
router.get("/",verifyToken, async (req, res) => {
  try {
    const operators = await Operator.find();
    res.status(200).json(operators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Operator.findByIdAndDelete(req.params.id);
    res.status(200).json("Operator has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
  module.exports = router;