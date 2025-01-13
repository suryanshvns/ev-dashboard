import connectToDatabase from "../../../lib/mongodb";
import Vehicle from "../../../models/Vehicle";

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    console.log('Handling /api/vehicles request...');

    if (req.method === "GET") {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      console.log(`Fetching vehicles - Page: ${page}, Limit: ${limit}`);

      const start = Date.now();

      // Get total count of vehicles for pagination
      const totalVehicles = await Vehicle.countDocuments({});
      const vehicles = await Vehicle.find({})
        .skip(skip)
        .limit(Number(limit));

      console.log(`Query execution time: ${Date.now() - start}ms`);

      return res.status(200).json({
        vehicles,
        totalVehicles,  // Include the total count of vehicles in the response
      });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection or query error:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
