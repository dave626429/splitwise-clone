import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: String,
    email: { type: String, required: true, unique: true },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    age: { type: Number, min: 5, max: 80 },
    location: String,
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
