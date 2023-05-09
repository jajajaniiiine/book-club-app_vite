/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import categories from "./categories.json";
import BookApi from "../../sdk/books-api";
import { useEffect, useState } from "react";
import { Save } from "@mui/icons-material";

export const UpdateBookForm = (props) => {
  const { data, setOpenUpdateForm, loading } = props;

  console.log(data)

  const [values, setValues] = useState();
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    console.log("values =>", values)
    event.preventDefault();
    // await BookApi.updateBook(data._id, values)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setOpenUpdateForm(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        defaultValue={(data && data.title) ? data.title : ''}
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
        defaultValue={(data && data.description) && data.description}
        onChange={(e) => handleChange(e)}
        // error={Boolean(formik.errors.description) && formik.touched.description}
        // onBlur={formik.handleBlur}
        // helperText={formik.errors.description}
      />
      <TextField
        disabled={loading}
        fullWidth
        margin="normal"
        label="Author"
        name="author"
        defaultValue={(data && data.author) && data.author}
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
        defaultValue={(data && data.category) && data.category}
        // value={data && data.category ? data.category : values.category}
        // onChange={(e, newValue) => {
        //   if (newValue.length > 0) {
        //     formik.setFieldValue("category", newValue);
        //   } else {
        //     formik.setFieldValue("category", []);
        //   }
        // }}
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
        defaultValue={(data && data.price) && data.price}
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
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </Button>
        <Button variant="outlined">Cancel</Button>
      </Stack>
    </>
  );
};
