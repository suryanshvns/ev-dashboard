import connectToDatabase from "../../../lib/mongodb";
import Vehicle from "../../../models/Vehicle";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const vehicles = await Vehicle.find({});
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
