"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import React from "react";

const SignInComponent = () => {
    const searchParams = useSearchParams();
    const { user } = useUser();
    const isCheckoutPage = searchParams.get("showSignUp") !== null; //not at checkout when != null
    const courseId = searchParams.get("id");
    
    const signUpUrl = isCheckoutPage ? `/checkout?step=1&id=${courseId}&showSignUp=true` : "/signup";

return (
    <SignIn
      appearance={{
        elements: {
            // change button color to purple
          formButtonPrimary:
            "bg-primary-700 text-white-100 hover:bg-primary-600 !shadow-none",
        },
      }}
      signUpUrl={signUpUrl}
    />
  );
};

export default SignInComponent;
