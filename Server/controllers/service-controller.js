// controllers/service-controller.js
import Service from "../models/service-model.js";

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error });
  }
};
