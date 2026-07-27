const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

 
  },
  { timestamps: true, versionKey: false },
);



module.exports = mongoose.model("Product", productSchema);
