import Stripe from "stripe";
import dotenv from "dotenv";
import { Request, Response } from "express";
import Course from "../models/courseModel";
import Transaction from "../models/transactionModel";
import UserCourseProgress from "../models/userCourseProgressModel";

dotenv.config(); // to use the enviroment variables

if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY does not exist");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripePaymentIntent = async (
    req: Request,
    res: Response
): Promise<void> => {
    let { amount } = req.body;

    // edge case for handling if course amount is 0 or not exist
    if (!amount || amount <=0 ) {
        amount = 50;
    }

    // connection to stripe payment card check out
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "cad",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            }
        }
        )

        res.json({message: "", data: {
            clientSecret: paymentIntent.client_secret,
        }});
    } catch(error) {
        res.status(500).json({message: "Error creating stripe payment intent", error});
    }
};

export const createTranscationPaymentIntent = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { userId, courseId, transcationId, amount, paymentProvider} = req.body;
   
    try{
        // 1. get course info
        const course = await Course.get(courseId);

        // 2. create trans record
        const newTranscation = new Transaction({
            dateTime: new Date().toISOString(),
            userId,
            courseId,
            transcationId,
            amount,
            paymentProvider
        })
        await newTranscation.save();

        // create user course progress
        const initialProgress = new UserCourseProgress({
            userId,
            courseId,
            enrollmentData: new Date().toISOString(),
            overallProgress: 0,
            sections: course.sections.map((section: any) => ({
                sectionId: section.sectionId,
                chapters: section.chapters.map((chapter: any) => ({
                    chapterId: chapter.chapterId,
                    completed: false
                }))
            })),
            lastAccessedTimestamp: new Date().toISOString()
        })
        await initialProgress.save();

        // add enrollment to the specific course
        await Course.update(
            {courseId},
            {
                $ADD: {
                    enrollments: [{ userId }],
                },
            }
        )

        res.json({message: "", data: {
            clientSecret: paymentIntent.client_secret,
        }});
    } catch(error) {
        res.status(500).json({message: "Error creating stripe payment intent", error});
    }
};