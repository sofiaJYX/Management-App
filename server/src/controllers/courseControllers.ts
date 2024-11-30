import { Request, Response } from "express";
import Course from "../models/courseModel";

export const listCourses = async(
    req: Request,
    res: Response
): Promise<void> => {
    const { category } = req.query;
    try{
        const courses = category && category !== "all"
        ? await Course.scan("category").eq(category).exec() // filter based on category
        : await Course.scan().exec(); // if doesnt exist get the entire course database
        
        res.json({message: "Courses retrieved success", data: courses});
    } catch(error) {
        res.status(500).json({message: "Error", error});
    }
};

export const getCourse = async(
    req: Request,
    res: Response
): Promise<void> => {
    const { courseId } = req.params; //param is more specific than .query as course needs id etc. than category
    try{
        const course = await Course.get(courseId);
        if (!course) {
            res.status(404).json({message: "course not found"});
            return;
        }

        res.json({message: "Courses retrieved success", data: course});
    } catch(error) {
        res.status(500).json({message: "Error", error});
    }
};