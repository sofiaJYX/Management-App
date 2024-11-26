"use client"

import React from 'react'
import { motion } from "framer-motion"
import Link from "next/link";

const Landing = () => {
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ duration: 0.5 }}
    className="landing"
    >
        <motion.div
            initial={{y:20, opacity: 0}}
            animate={{y:0,  opacity: 1}}
            transition={{ duration: 0.5 }}
            className="landing__hero"
        >
        
        
            <div className="landing__hero-content">
                <h1 className="landing__titiel">Courses</h1>
                    <p className="landing__description">
                        This is the list of courses you can enroll.
                        <br />
                        Courses when you need them and want them.
                    </p>
                    <div className="landing__cta">
                        <Link href="/sesrch">
                            <div className="landing__cta-button">Search for Courses</div>
                        </Link>
                    </div>
            </div>
        </motion.div>
    </motion.div>
  )
};

export default Landing;