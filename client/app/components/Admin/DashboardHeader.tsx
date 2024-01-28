"use client";

import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

type Props = {};

const DashboardHeader = (props: Props) => {
  const [open, setIsOpen] = useState(false);
  return (
    <div className="w-[85%] flex items-center justify-end p-6 fixed top-5 right-0">
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setIsOpen(!open)}
      >
        <IoNotificationsOutline className="text-2xl cursor-pointer text-black" />
        <span className="absolute -top-2 -right-2 bg-[#4745e4] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
      {open && (
        <div className="w-[350px] bg-slate-400 shadow-lg shadow-slate-900/20 absolute top-16 z-10 rounded border">
          <h5 className="text-center text-[20px] font-Poppins text-black p-3">
            Notifications
          </h5>
          <div className="bg-[#00000013] font-Poppins">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black">New Question Received</p>
              <p className="text-black cursor-pointer">Mark as read</p>
            </div>
            <p className="px-2 text-black">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              expedita esse voluptatibus totam voluptatem possimus eum
              obcaecati, eos tenetur facere quisquam vero eius pariatur
              perferendis nihil deleniti mollitia? Obcaecati, deleniti.
            </p>
            <p className="p-2 text-black text-[14px]">5 days ago</p>
          </div>
          <div className="bg-[#00000013] font-Poppins">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black">New Question Received</p>
              <p className="text-black cursor-pointer">Mark as read</p>
            </div>
            <p className="px-2 text-black">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              expedita esse voluptatibus totam voluptatem possimus eum
              obcaecati, eos tenetur facere quisquam vero eius pariatur
              perferendis nihil deleniti mollitia? Obcaecati, deleniti.
            </p>
            <p className="p-2 text-black text-[14px]">5 days ago</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
