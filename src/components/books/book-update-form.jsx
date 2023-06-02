/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import categories from "./categories.json";
import BookApi from "../../sdk/books-api";
import { useEffect, useState } from "react";
import { ArrowBack, Save } from "@mui/icons-material";

export const UpdateBookForm = (props) => {
  const { data, values, setValues, onSave  } = props;

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        defaultValue={data && data.title && data.title}
        onChange={(e) => handleChange(e)}
        // error={Boolean(formik.errors.description) && formik.touched.description}
        // onBlur={formik.handleBlur}
        // helperText={formik.errors.description}
      />
      <TextField
        multiline
        fullWidth
        margin="normal"
        label="Book Description"
        name="description"
        defaultValue={data && data.description && data.description}
        onChange={(e) => handleChange(e)}
        // error={Boolean(formik.errors.description) && formik.touched.description}
        // onBlur={formik.handleBlur}
        // helperText={formik.errors.description}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Author"
        name="author"
        defaultValue={data && data.author && data.author}
        InputLabelProps={{
          shrink: data && data.author ? true : false,
        }}
        onChange={handleChange}
        // error={Boolean(formik.errors.author) && formik.touched.author}
        // onBlur={formik.handleBlur}
        // helperText={formik.errors.author}
      />
      <Autocomplete
        multiple
        options={categories}
        getOptionLabel={(option) => option.label}
        name="category"
        defaultValue={data && data.category && data.category}
        // value={data && data.category ? data.category : values.category}
        onChange={(e, newValue) => {
          if (newValue.length > 0) {
            setValues({
              ...values,
              category: newValue,
            });
          } else {
            setValues({
              ...values,
              category: [],
            });
          }
        }}
        // onBlur={formik.handleBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select category"
            margin="normal"
            // error={Boolean(formik.errors.category) && formik.touched.category}
            // helperText={formik.errors.category}
          />
        )}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Price"
        name="price"
        defaultValue={data && data.price && data.price}
        InputLabelProps={{
          shrink: data && data.price ? true : false,
        }}
        onChange={handleChange}
        // error={Boolean(formik.errors.price) && formik.touched.price}
        // onBlur={formik.handleBlur}
        // helperText={formik.errors.price}
      />
      <Stack direction="row-reverse" spacing={1}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => onSave(data.bookId)}
        >
          Save
        </Button>
        <Button variant="outlined">Cancel</Button>
      </Stack>
    </>
  );
};
