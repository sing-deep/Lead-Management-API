import express from "express";
import {
  createLead,
  getLeads,

} from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/leads", createLead);
router.get("/leads", getLeads); 

export default router;