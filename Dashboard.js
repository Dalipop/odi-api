// models/Dashboard.js
const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    operator: { type: mongoose.Schema.Types.ObjectId, ref: 'Operator', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dashboard', DashboardSchema);