import mongoose from "mongoose";

const birthdaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Person's name is required"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    // Add this user field
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", 
    },
  },
  {
    timestamps: true,
  }
);

const Birthday = mongoose.model("Birthday", birthdaySchema);
export default Birthday;