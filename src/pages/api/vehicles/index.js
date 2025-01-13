import connectToDatabase from "../../../lib/mongodb";
import Vehicle from "../../../models/Vehicle";

export default async function handler(req, res) {
  try {
    await connectToDatabase(); // Connect to the database

    if (req.method === "GET") {
      // Fetch all vehicles from the database
      const vehicles = await Vehicle.find({});
      return res.status(200).json(vehicles);
    } else {
      // If method is not GET, return 405 Method Not Allowed
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Handle any error that occurs during the database connection or query
    console.error("Database connection or query error:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
