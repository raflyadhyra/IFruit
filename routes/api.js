import express from "express";
import DataController from "../controller/DataController.js";

const router = express.Router();

router.post("/data", DataController.store);
router.get("/data/FruitName", DataController.index);
router.get("/data/FruitType", DataController.type);
router.get("/data/sum", DataController.sum);

export default router;
