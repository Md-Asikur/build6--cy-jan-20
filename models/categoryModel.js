const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your category"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("category", categorySchema);
