import express from "express";
import { getCourse, listCourses } from "../controllers/courseControllers";

const router = express.Router();

// endpoint(routes) for course controller
router.get("/", listCourses);
router.get("/:courseId", getCourse);

export default router;