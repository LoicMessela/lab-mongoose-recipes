const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { Date } = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    try {
      const newRecipe = await Recipe.create({
        title: "Chocolate Cake",
        level: "Amateur Chef",
        ingredients: ["milk", "flour", "chocolate", "lemon"],
        cuisine: "Kitchen",
        dishType: "dessert",
        image: "https://images.media-allrecipes.com/images/75131.jpg",
        duration: 30,
        creator: "Maria E.",
        created: "10/02/2022",
      });
      console.log(newRecipe.title);
      const otherRecipe = await Recipe.insertMany(data);
      otherRecipe.forEach((element) => console.log(element.title));

      const modifiedTitle = await Recipe.findOneAndUpdate(
        {
          title: "Rigatoni alla Genovese",
        },
        { duration: 100 },
        { new: true }
      );
      console.log(modifiedTitle);
      const deleteRecipe = await Recipe.findOneAndDelete({
        title: "Carrot Cake",
      });
      console.log(deleteRecipe);
    } catch (error) {
      console.log(error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
