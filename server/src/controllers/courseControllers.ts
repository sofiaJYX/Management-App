import { Request, Response } from "express";
import Course from "../models/courseModel";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";
import { title } from "process";

export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;
  try {
    const courses =
      category && category !== "all"
        ? await Course.scan("category").eq(category).exec() // filter based on category
        : await Course.scan().exec(); // if doesnt exist get the entire course database
    res.json({ message: "Courses retrieved success", data: courses });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

// get a single course
export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params; //param is more specific than .query as course needs id etc. than category
  try {
    const course = await Course.get(courseId);
    if (!course) {
      res.status(404).json({ message: "course not found" });
      return;
    }

    res.json({ message: "Courses retrieved success", data: course });
  } catch (error) {
    res.status(500).json({ message: "Error get course", error });
  }
};

export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { teacherId, teacherName } = req.body;

    if (!teacherId || !teacherName) {
      res.status(400).json({ message: "Teacher Id and name required" });
      return;
    }

    const newCourse = new Course({
      courseId: uuidv4(),
      teacherId,
      teacherName,
      title: "Untitled Course",
      description: "",
      category: "Uncategorized",
      image: "",
      price: 0,
      level: "Beginner",
      status: "Draft",
      sections: [],
      enrollments: [],
    });
    await newCourse.save();

    res.json({ message: "Courses created success", data: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
};
