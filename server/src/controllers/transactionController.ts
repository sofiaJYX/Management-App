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