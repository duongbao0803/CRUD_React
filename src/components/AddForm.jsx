import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      avatar: "",
      address: "",
      age: "",
      agree: false,
    },

    onSubmit: (values) => {
      try {
        const res = axios.post(
          "https://65460c46fe036a2fa9551d05.mockapi.io/users",
          {
            name: values.name,
            avatar: values.avatar,
            address: values.address,
            age: values.age,
          }
        );
        alert("Add Successfully");
        navigate("/home");
      } catch (error) {
        console.log("Error Adding User", error);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(3, "Must be 3 characters or more"),
      avatar: Yup.string().required("Required.").url("Please type URL"),
      address: Yup.string().required("Required."),
      age: Yup.number()
        .required("Required.")
        .max(120, "Please type age from 1 to 120"),
    }),
  });

  return (
    <>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "orange",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            flexDirection: "column",
            display: "flex",
            width: "30%",
            border: "1px solid black",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              marginBottom: "50px",
              fontSize: "50px",
              textAlign: "center",
            }}
          >
            ADD NEW USER
          </div>
          <div style={{ position: "relative", marginBottom: "26px" }}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              style={{ width: "100%" }}
            />
            <div style={{ position: "absolute" }}>
              {formik.errors.name && (
                <Typography variant="caption" color="red">
                  {formik.errors.name}
                </Typography>
              )}
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: "26px" }}>
            <TextField
              label="Age"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              style={{ width: "100%" }}
            />
            <div style={{ position: "absolute" }}>
              {formik.errors.age && (
                <Typography variant="caption" color="red">
                  {formik.errors.age}
                </Typography>
              )}
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: "26px" }}>
            <TextField
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              style={{ width: "100%" }}
            />
            <div style={{ position: "absolute" }}>
              {formik.errors.address && (
                <Typography variant="caption" color="red">
                  {formik.errors.address}
                </Typography>
              )}
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: "26px" }}>
            <TextField
              label="avatar"
              name="avatar"
              value={formik.values.avatar}
              onChange={formik.handleChange}
              style={{ width: "100%" }}
            />
            <div style={{ position: "absolute" }}>
              {formik.errors.avatar && (
                <Typography variant="caption" color="red">
                  {formik.errors.avatar}
                </Typography>
              )}
            </div>
          </div>
          <Button
            type="submit"
            style={{
              border: "1px solid #e8f0fe",
              backgroundColor: "#e8f0fe",
            }}
          >
            Add User
          </Button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddForm;
