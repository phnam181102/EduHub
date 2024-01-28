import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { MenuItem, Sidebar, Menu } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import {
  HomeOutlinedIcon,
  ArrowForwardIosSharpIcon,
  ArrowBackIosSharpIcon,
  PeopleOutlineOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icon";
import Image from "next/image";
import avatarDefault from "../../../../public/assets/logo.png";
import Link from "next/link";

interface itemsProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemsProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link href={to}>
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
        className="text-black hover:text-[#4745e4]"
      >
        <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const AdminSidebar = () => {
  // const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .ps-active": {
          color: "#4745e4 !important",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu
        // iconShape="square"
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <ArrowForwardIosSharpIcon className="text-black" />
              ) : undefined
            }
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Link href="/" className="!no-underline">
                  <h3 className="text-[25px] font-Poppins no-underline text-black">
                    EduHub
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosSharpIcon className="text-black" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  // src={user.avatar ? user.avatar.url : avatarDefault}
                  src={avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* {user?.name} */}Phu Nguyen
                </Typography>
                <Typography
                  variant="h6"
                  className="!text-[20px] text-black capitalize"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* - {user?.role} */} - Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon className="fill-black" />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Anylytics"}
            </Typography>
            <Item
              title="Courses Anylytics"
              to="/admin/course-anylytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Anylytics"
              to="/admin/orders-anylytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={logoutHandler}>
              <Item
                title="Logout"
                to="/"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AdminSidebar;
