import Lead from "../models/lead.model.js";

// Create Lead
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Get All Leads
export const getLeads = async (req, res) => {
  console.log("getLeads")
  const leads = await Lead.find();
  res.json(leads);
};
