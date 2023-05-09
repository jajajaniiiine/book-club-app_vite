import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import categories from "./categories.json";
import * as Yup from "yup";
import { useFormik } from "formik";
import BookApi from "../../sdk/books-api";

export const AddBookForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      category: [],
      author: "",
      description: "",
      price: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      category: Yup.array().required("Category is required"),
      author: Yup.string().required("Author is required"),
      description: Yup.string(),
      price: Yup.number().required("Price is required"),
    }),
    onSubmit: async (values) => {
      try {
        await BookApi.addBook(values).then(result => {
          console.log(result);
          if (result.status === 201) {
            formik.resetForm();
          }
        }).catch(error => { 
          console.log(error);
        })
      } catch (error) {
        return error
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off" noValidate>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        onChange={formik.handleChange}
        error={Boolean(formik.errors.title) && formik.touched.title}
        onBlur={formik.handleBlur}
        helperText={formik.errors.title}
        name="title"
      />
      <TextField
        multiline
        fullWidth
        margin="normal"
        label="Book Description"
        onChange={formik.handleChange}
        name="description"
        error={Boolean(formik.errors.description) && formik.touched.description}
        onBlur={formik.handleBlur}
        helperText={formik.errors.description}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Author"
        onChange={formik.handleChange}
        error={Boolean(formik.errors.author) && formik.touched.author}
        onBlur={formik.handleBlur}
        name="author"
        helperText={formik.errors.author}
      />
      <Autocomplete
        multiple
        options={categories}
        getOptionLabel={(option) => option.label}
        name="category"
        onChange={(e, newValue) => {
          if (newValue.length > 0) {
            formik.setFieldValue("category", newValue);
          } else {
            formik.setFieldValue("category", []);
          }
        }}
        onBlur={formik.handleBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select category"
            margin="normal"
            error={Boolean(formik.errors.category) && formik.touched.category}
            helperText={formik.errors.category}
          />
        )}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Price"
        onChange={formik.handleChange}
        error={Boolean(formik.errors.price) && formik.touched.price}
        onBlur={formik.handleBlur}
        helperText={formik.errors.price}
        name="price"
      />
      <Stack direction="row-reverse" spacing={1}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button variant="outlined" type="reset">
          Reset
        </Button>
      </Stack>
    </form>
  );
};
