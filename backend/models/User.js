import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },
  recoveryCodeHash: {
  type: String,
  default: null,
},
});



const User = mongoose.model("User", userSchema);

export default User;