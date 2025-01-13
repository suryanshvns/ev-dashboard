const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  VIN: String,
  County: String,
  City: String,
  State: String,
  Postal_Code: String,
  Model_Year: Number,
  Make: String,
  Model: String,
  Electric_Vehicle_Type: String,
  CAFV_Eligibility: String,
  Electric_Range: Number,
  Base_MSRP: Number,
  Legislative_District: Number,
  DOL_Vehicle_ID: String,
  Vehicle_Location: String,
  Electric_Utility: String,
  Census_Tract: String,
});

module.exports = mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);
