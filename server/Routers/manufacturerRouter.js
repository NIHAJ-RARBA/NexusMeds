import client from "../DB.js";
import express from "express";

const router = express.Router();

import {
    getManufacturerById
    } from "../Controllers/manufacturerController.js";

router.get('/:id', getManufacturerById);

export default router;