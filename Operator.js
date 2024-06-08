const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    logo: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);
const Operator = mongoose.model('Operator', operatorSchema);
module.exports = Operator;
