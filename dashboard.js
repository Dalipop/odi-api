// routes/dashboard.js
const router = require('express').Router();
const Dashboard = require('../models/Dashboard');
const Operator = require('../models/Operator');
const { verifyToken } = require('./verifyToken');

router.get('/operator/:id', verifyToken, async (req, res) => {
  try {
    const reports = await Dashboard.find({ operator: req.params.id }).populate('operator');
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE
router.post("/", verifyToken, async (req, res) => {
    Operator.findOne({_id:req.body.operator})
    .then((operatocheck) => {
    const newDashboard = new Dashboard({name:req.body.name,link:req.body.link,operator:operatocheck});
    

      newDashboard.save().then((savedDashboard)=>{
      res.status(201).json(savedDashboard);
    })
    .catch((err)=> res.status(500).json(err));
    
})
.catch((err) =>  res.status(500).json(err));
  });

  
  // READ ALL
  router.get("/", verifyToken, async (req, res) => {
    try {
      const dashboards = await Dashboard.find().populate('operator');
      res.status(200).json(dashboards);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // READ BY ID
  router.get("/:id", verifyToken, async (req, res) => {
    try {
      const dashboard = await Dashboard.findById(req.params.id);
      res.status(200).json(dashboard);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // UPDATE
  router.put("/:id", verifyToken, async (req, res) => {
    try {
      const updatedDashboard = await Dashboard.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedDashboard);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE
  router.delete("/:id", verifyToken, async (req, res) => {
    try {
      await Dashboard.findByIdAndDelete(req.params.id);
      res.status(200).json("Dashboard has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;