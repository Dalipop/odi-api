const Role = require("../models/Role");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// Create a new role
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const { name } = req.body;
  const existingRole = await Role.findOne({ name });
  if (existingRole) {
    return res.status(400).json({
      message: "A role with the same name already exists.",
    });
  } else {
    try {
      const newRole = new Role({
        name,
      });
      const savedRole = await newRole.save();
      res.status(201).json(savedRole);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// Get all roles
router.get("/", verifyToken, async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a role by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a role by ID
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a role by ID
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Role has been deleted..." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
