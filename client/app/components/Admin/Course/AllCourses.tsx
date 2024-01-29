"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import Modal from "@mui/material/Modal/Modal";
import { styles } from "@/app/styles/styles";
import { toast } from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    {
      field: "",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className="text-black" size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete className="text-black" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any[] = [];

  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.rating,
          purchased: item.purchased,
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setOpen(false);
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
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
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="moda-modal-description"
            >
              <Box className="absolute top-[40%] left-[50%] -translate-x-1/2 p-10 shadow-2xl bg-gray-300 rounded-lg">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this course?
                </h1>
                <div className="flex w-full items-center justify-around mb-6 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`!bg-red-500 ${styles.button} !w-[120px] h-[30px] `}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
