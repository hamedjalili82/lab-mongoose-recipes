//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],
  cuisine: {
    type: String,
    require: true,
  },
  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert"],
  },
  image: {
    type: String,
    default: "/images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    minlength: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;