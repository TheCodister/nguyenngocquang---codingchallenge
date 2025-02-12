import express from "express";
import {
  createConversion,
  deleteConversion,
  getConversions,
  updateConversion,
} from "../controllers/conversionController";

const router = express.Router();

router.post("/", createConversion);
router.get("/", getConversions);
router.put("/:id", updateConversion);
router.delete("/:id", deleteConversion);

export default router;
