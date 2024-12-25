"use client";

import Loading from "@/src/components/Loading";
import { useCurrentCourse } from "@/src/hooks/useCurrentCourse";
import { useGetCourseQuery } from "@/src/state/api";
import { useSearchParams } from "next/navigation"
import React from 'react'

const CheckoutDetailsPage = () => {
    const {course: selectedCourse, isLoading, isError} = useCurrentCourse();
    const searchParam = useSearchParams();
    const showSignUp = searchParam.get("showSignUp") === "true";

    if (isLoading) return <Loading />;
    if (isError) return <div>Failed to fetch data</div>
    if (!selectedCourse) return <div>Course not found</div>

  return (
    <div>index</div>
  )
}

export default CheckoutDetailsPage;