const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  dateofbirth:{type: Date},
  img: { type: String },
  role: { type: Schema.Types.ObjectId,
  ref: 'Role'},
  operator: { type: Schema.Types.ObjectId,
  ref: 'Operator' ,required:true},
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
