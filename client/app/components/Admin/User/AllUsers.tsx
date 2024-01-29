"use client";

import React, { FC, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { useGetAllUserQuery } from "@/redux/user/userApi";
import { format } from "timeago.js";
import { MdEmail } from "react-icons/md";
import { styles } from "@/app/styles/styles";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const [active, setAcitve] = useState(false);
  const { isLoading, data, error } = useGetAllUserQuery({});

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    {
      field: "",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <FiEdit2 className="text-black" size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <MdEmail className="text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any[] = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[200px] cursor-pointer`}
              onClick={() => setAcitve(!active)}
            >
              Add new Member
            </div>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none !important",
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
