import express from "express";
const router = express.Router();
import {
    createCategory
  } from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createCategory);

export default router;