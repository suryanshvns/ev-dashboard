const csvtojson = require("csvtojson");
const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle"); // Ensure the path is correct

const MONGODB_URI = "mongodb+srv://suryanshr45:NpXRqjQ0Zt21flGk@cluster0.9zi7s.mongodb.net/?retryWrites=true&w=majority";

async function uploadCSV() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Update this path to the actual location of your CSV file
    const jsonArray = await csvtojson().fromFile("../data/vehicles.csv");
    
    // Insert the data into the MongoDB collection
    await Vehicle.insertMany(jsonArray);

    console.log("CSV data uploaded successfully!");
  } catch (err) {
    console.error("Error uploading CSV data:", err);
  } finally {
    mongoose.connection.close();
  }
}

uploadCSV();
