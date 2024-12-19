import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpComponent = () => {
  return (
    <SignUp
      appearance={{
        elements: {
            // change button color to purple
          formButtonPrimary:
            "bg-primary-700 text-white-100 hover:bg-primary-600 !shadow-none",
        },
      }}
    />
  );
};

export default SignUpComponent;
