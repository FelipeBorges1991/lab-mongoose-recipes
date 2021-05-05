const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const result = Recipe.create({
      title: "Ovo mexido",
      level: "Easy Peasy",
      ingredients: [
        "1 ovo",
        "1 colher de manteiga",
        "2 pitadas de sal",
        "Pimenta do Reino",
      ],
      cuisine: "American",
      dishType: "breakfast",
      image:
        "https://p7m4z9n9.stackpathcdn.com/wp-content/uploads/2020/02/ovo_mexido_receita32.jpg",
      duration: 8,
      creator: "Chef Felipe",
    });

    console.log("CREATED RECIPE =>", result);

    const allRecipes = Recipe.insertMany(data);

    console.log("All Recipes =>", allRecipes);

    const updatedRecipe = Recipe.findOneAndUpdate(
      { "title": "Rigatoni alla Genovese" },
      { $set: { "duration": 100 } },
      { new: true }
    );

    console.log("UPDATED RECIPE =>", updatedRecipe);

    const deleteRecipe = Recipe.deleteOne({
      title: "Carrot Cake",
    });

    console.log("DELETE RESULT =>", deleteRecipe);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
