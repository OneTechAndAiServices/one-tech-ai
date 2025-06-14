
"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import BeatLoader from "react-spinners/BeatLoader";
import FormOnly from "./Formonly";


const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
  message: Yup.string().min(10, "Too short").required("Required"),
});

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    try {
      
      await new Promise((res) => setTimeout(res, 1500));
      Swal.fire({
        icon: "success",
        title: "Message sent!",
        text: "We’ll get back to you soon.",
      });
      resetForm();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        // background: "linear-gradient(to bottom right, #f0f8ff, #ffffff)",
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 3,
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
       
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url("/london.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 600,
          }}
        />

   
        <Box sx={{ flex: 1, p: 4 }}>
          <Typography variant="h4" fontWeight={400} mb={2}>
            Stay Updated
          </Typography>
          <Typography variant="body1" mb={4}>
            Have a question or need a custom solution? We’re here to help!
          </Typography>

          <FormOnly/>

          {/* <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              phone: "",
              postalCode: "",
              message: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  {[
                    { name: "name", placeholder: "Name" },
                    { name: "surname", placeholder: "Surname" },
                  ].map((field) => (
                    <Grid  size={{xs:12,sm:6}} key={field.name}>
                      <Field name={field.name}>
                        {({ field }) => (
                          <TextField
                            {...field}
                            placeholder={field.placeholder}
                            fullWidth
                            size="small"
                            error={touched[field.name] && Boolean(errors[field.name])}
                            helperText={touched[field.name] && errors[field.name]}
                            InputProps={{
                              sx: {
                                height: "42px",
                                backgroundColor: "#E6E9ED",
                                borderRadius: "20px",
                                "& fieldset": { border: "none" },
                              },
                            }}
                          />
                        )}
                      </Field>
                    </Grid>
                  ))}
                  

                  <Grid size={{xs:12}}>
                    <Field name="email">
                      {({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Email Address"
                          fullWidth
                          size="small"
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          InputProps={{
                            sx: {
                              height: "42px",
                              backgroundColor: "#E6E9ED",
                              borderRadius: "20px",
                              "& fieldset": { border: "none" },
                            },
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  {[
                    { name: "phone", placeholder: "Phone Number" },
                    { name: "postalCode", placeholder: "Postal Code" },
                  ].map((field) => (
                    <Grid size={{xs:12,sm:6}} key={field.name}>
                      <Field name={field.name}>
                        {({ field }) => (
                          <TextField
                            {...field}
                            placeholder={field.placeholder}
                            fullWidth
                            size="small"
                            error={touched[field.name] && Boolean(errors[field.name])}
                            helperText={touched[field.name] && errors[field.name]}
                            InputProps={{
                              sx: {
                                height: "42px",
                                backgroundColor: "#E6E9ED",
                                borderRadius: "20px",
                                "& fieldset": { border: "none" },
                              },
                            }}
                          />
                        )}
                      </Field>
                    </Grid>
                  ))}

                  <Grid  size={{xs:12}}>
                    <Field name="message">
                      {({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Message"
                          fullWidth
                          multiline
                          rows={4}
                          error={touched.message && Boolean(errors.message)}
                          helperText={touched.message && errors.message}
                          InputProps={{
                            sx: {
                              backgroundColor: "#E6E9ED",
                              borderRadius: "20px",
                              "& fieldset": { border: "none" },
                            },
                          }}
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>

                <Box textAlign="center" mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting}
                    sx={{
                      borderRadius: 8,
                      px: 9,
                      py: 1,
                      backgroundColor: "black",
                    }}
                  >
                    {submitting ? (
                      <BeatLoader size={8} />
                    ) : (
                      "Submit Now"
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;
