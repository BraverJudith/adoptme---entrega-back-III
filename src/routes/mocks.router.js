import { Router } from "express";
import { getMockingsPet, getMockingsUsers, generateData } from "../controllers/mocks.controller.js";


const router = Router();

router.get('/mockingpets',getMockingsPet);

router.get("/mockingusers", getMockingsUsers);

router.post("/generatedata",generateData);


export default router;