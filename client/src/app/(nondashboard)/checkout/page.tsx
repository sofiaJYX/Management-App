import Loading from "@/src/components/Loading";
import { useUser } from "@clerk/nextjs";
import React from "react";
import WizardStepper from "@/src/components/WizardStepper";
import { useCheckoutNavigation } from "@/src/hooks/useCheckoutNavigation";

const CheckoutWizard = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();

  if (!isLoaded) {
    return <Loading />
  }

  // determine the routing for the 3 pages on checkout
  const renderStep = () => {
    switch (checkoutStep) {
        case 1:
            return "checkout details page"
        case 2:
            return "payment"
        case 3:
            return "completion"
        default:
            return "checkout details page"
    }
  }


  return (
    <div className="checkout">
      <WizardStepper currentStep={checkoutStep} />
      <div className="checkout__content">{renderStep()}</div>
    </div>
  );
};

export default CheckoutWizard;
