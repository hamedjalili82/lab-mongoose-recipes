const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const recipesData = require("./data.json");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const recipeToAdd = { title: "Pizza", cuisine: "Italian" };
const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create(recipeToAdd);
  })
  .then((added) => {
    console.log(added.title);
    return Recipe.insertMany(recipesData);
  })
  .then((createdRecipes) => {
    console.log("Added recipes:");
    createdRecipes.forEach((recipe) => {
      console.log(recipe.title);
    });

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    )
      .then((updatedRecipe) => {
        console.log("Updated recipe:", updatedRecipe);
      })
      .then(() => {
        return Recipe.deleteOne({ title: "Carrot Cake" });
      })
      .then((removedRecipe) => {
        console.log("Removed Recipe", removedRecipe);
      })
      .then(() => {
        return mongoose.connection.close();
      })
      .then((x) => {
        console.log(`Closed the conection: "${x.connection.name}"`);
      })
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });
  });