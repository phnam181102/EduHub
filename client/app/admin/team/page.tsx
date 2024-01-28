"use client";

import AllCourses from "@/app/components/Admin/Course/AllCourses";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AllUsers from "@/app/components/Admin/User/AllUsers";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      {/* <AdminProtected> */}
      <Heading
        title="EduHub - Admin"
        description="EduHub is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <AllUsers isTeam={true} />
        </div>
      </div>
      {/* </AdminProtected> */}
    </div>
  );
};

export default page;
