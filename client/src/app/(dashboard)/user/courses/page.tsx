"use client";

import { useCreateCourseMutation, useDeleteCourseMutation, useGetCoursesQuery } from "@/src/state/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from 'react';
import Header from "@/src/components/Header";
import Loading from "@/src/components/Loading";
import TeacherCourseCard from "@/src/components/TeacherCourseCard";
import Toolbar from "@/src/components/Toolbar";
import { Button } from "@/src/components/ui/button";

const Courses = () => {
    const router = useRouter();
    const { user } = useUser();
    const {
      data: courses,
      isLoading,
      isError,
    } = useGetCoursesQuery({ category: "all" });
  

    const [createCourse] = useCreateCourseMutation();
    const [deleteCourse] = useDeleteCourseMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredCourses = useMemo(() => {
        if (!courses) return [];
    
        return courses.filter((course) => {
          const matchesSearch = course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesCategory =
            selectedCategory === "all" || course.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
      }, [courses, searchTerm, selectedCategory]);

      const handleEdit = (course: Course) => {
        router.push(`/teacher/courses/${course.courseId}`);
      };
    
      const handleDelete = async (course: Course) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
          await deleteCourse(course.courseId).unwrap();
        }
      };
    
      const handleCreateCourse = async () => {
        if (!user) return;
    
        const result = await createCourse({
          teacherId: user.id,
          teacherName: user.lastName || "Unknown Teacher",
        }).unwrap();
        router.push(`/teacher/courses/${result.courseId}`);
      };
    
      if (isLoading) return <Loading />;
      if (isError || !courses) return <div>Error loading courses.</div>;
    
      return (
        <div className="teacher-courses">
          <Header
            title="Courses"
            subtitle="Browse your courses"
            rightElement={
              <Button
                onClick={handleCreateCourse}
                className="teacher-courses__header"
              >
                Create Course
              </Button>
            }
          />
          <Toolbar
            onSearch={setSearchTerm}
            onCategoryChange={setSelectedCategory}
          />
          <div className="teacher-courses__grid">
            {filteredCourses.map((course) => (
              <TeacherCourseCard
                key={course.courseId}
                course={course}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isOwner={course.teacherId === user?.id}
              />
            ))}
          </div>
        </div>
      );
};

export default Courses;