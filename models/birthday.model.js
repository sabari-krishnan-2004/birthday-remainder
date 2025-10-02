import mongoose from "mongoose";

const birthdaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    dob: {
        type: Date,
        required: [true, "Please add a date of birth"],
    },
}, {
    timestamps: true,
});

const Birthday = mongoose.model("Birthday", birthdaySchema);

export default Birthday;