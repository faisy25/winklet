const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: "default catgeory description"
  },
  image: { type: String, default: "/images/tablets-catgeory.png" },
  attrs: [{ key: { type: String }, value: [{ type: String }] }]
});

categorySchema.index({ description: 1 });

const Category = mongoose.model("Catgeory", categorySchema);
module.exports = Category;
