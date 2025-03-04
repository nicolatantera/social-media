import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "@/utils/state/state";
import Dropzone from "react-dropzone";

import FlexBetween from "@/components/Style/FlexBetween";
import { RegisterFormValues, LoginFormValues } from "@/utils/interfaces/LoginRegister";

type FormValues = RegisterFormValues | LoginFormValues;

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const initialValuesLogin: LoginFormValues = {
  email: "",
  password: "",
};

export default function Form() {
  const [pageType, setPageType] = useState<string>("login");

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobileScreens: boolean = useMediaQuery("(min-width: 600px)");

  const isLogin: boolean = pageType === "login";
  const isRegister: boolean = pageType === "register";

  const register = async (values: RegisterFormValues, onSubmitProps: FormikHelpers<RegisterFormValues>) => {
    // this allows us to send form info containing image
    const formData = new FormData();

    for (const key in values) {
      const value = values[key as keyof RegisterFormValues];

      // Handle null values by appending an empty string
      if (value === null) {
        formData.append(key, "");
      } else if (value instanceof File) {
        // Handle File objects
        formData.append(key, value.name);
      } else {
        // Handle string values
        formData.append(key, value);
      }
    }
    if (values.picture) formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });

    const savedUser = await savedUserResponse.json();

    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values: LoginFormValues, onSubmitProps: FormikHelpers<LoginFormValues>) => {
    const loggedInResponse = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();

    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
      navigate("/social-media/home");
    }
  };

  const handleFormSubmit = async (values: FormValues, onSubmitProps: FormikHelpers<FormValues>) => {
    if (isLogin) {
      await login(values as LoginFormValues, onSubmitProps as FormikHelpers<LoginFormValues>);
    }
    if (isRegister) {
      await register(values as RegisterFormValues, onSubmitProps as FormikHelpers<RegisterFormValues>);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  id="firs-name-field"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).firstName}
                  name="firstName"
                  error={
                    Boolean((touched as FormikTouched<RegisterFormValues>).firstName) &&
                    Boolean((errors as FormikErrors<RegisterFormValues>).firstName)
                  }
                  helperText={
                    (touched as FormikTouched<RegisterFormValues>).firstName &&
                    (errors as FormikErrors<RegisterFormValues>).firstName
                  }
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  id="last-name-field"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).lastName}
                  name="lastName"
                  error={
                    Boolean((touched as FormikTouched<RegisterFormValues>).lastName) &&
                    Boolean((errors as FormikErrors<RegisterFormValues>).lastName)
                  }
                  helperText={
                    (touched as FormikTouched<RegisterFormValues>).lastName &&
                    (errors as FormikErrors<RegisterFormValues>).lastName
                  }
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  id="location-field"
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).location}
                  name="location"
                  error={
                    Boolean((touched as FormikTouched<RegisterFormValues>).location) &&
                    Boolean((errors as FormikErrors<RegisterFormValues>).location)
                  }
                  helperText={
                    (touched as FormikTouched<RegisterFormValues>).location &&
                    (errors as FormikErrors<RegisterFormValues>).location
                  }
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <TextField
                  id="occupation-field"
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).occupation}
                  name="occupation"
                  error={
                    Boolean((touched as FormikTouched<RegisterFormValues>).occupation) &&
                    Boolean((errors as FormikErrors<RegisterFormValues>).occupation)
                  }
                  helperText={
                    (touched as FormikTouched<RegisterFormValues>).occupation &&
                    (errors as FormikErrors<RegisterFormValues>).occupation
                  }
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="1rem">
                  <Dropzone
                    accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <input id="form-id" {...getInputProps()} />
                        {!(values as RegisterFormValues).picture ? (
                          <p>Add picture here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{(values as RegisterFormValues).picture?.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* THIS SECTION IS FOR BOTH LOGIN AND REGISTER (EMAIL AND PASSWORD IS IN BOTH) */}
            <TextField
              autoComplete="false"
              id="email-field"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              id="password-field"
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>

          {/* BUTTONS SECTION */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}
