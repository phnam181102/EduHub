"use client";

import EditCourse from "@/app/components/Admin/Course/EditCourse";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;
  return (
    <div>
      <Heading
        title="EduHub - Admin"
        description="EduHub is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
