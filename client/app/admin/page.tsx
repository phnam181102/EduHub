"use client";

import DashboardHero from "../components/Admin/DashboardHero";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import Heading from "../utils/Heading";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <AdminProtected>
        <Heading
          title="Eduhub - Admin"
          description="Eduhub is a platform for students to learn and get help from teachers"
          keywords="Programing, MERN, Redux, Machine Learning"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default page;
