import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function EditModal() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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
        const res = axios.put(
          `https://652fa0cc6c756603295d6229.mockapi.io/users/${id}`,
          {
            name: values.name,
            avatar: values.avatar,
            address: values.address,
            age: values.address,
          }
        );
        if (res && res.status === 200) {
          toast.success("Add thành công");
        }
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
        className="form"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            flexDirection: "column",
            display: "flex",
            width: "40%",
            border: "1px solid black",
            padding: "20px",
          }}
        >
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
            style={{ border: "1px solid #e8f0fe", backgroundColor: "#e8f0fe" }}
          >
            Add User
          </Button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default EditModal;