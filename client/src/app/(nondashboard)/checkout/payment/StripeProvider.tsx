import React from 'react'

if(!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set");
}

const StripeProvider = () => {
  return (
    <div>StripeProvider</div>
  )
}

export default StripeProvider;