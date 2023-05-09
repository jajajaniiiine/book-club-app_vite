import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { BookCard } from "../components/books/book-card";
import { Add, Close } from "@mui/icons-material";
import { AddBookForm } from "../components/books/book-add-form";
import BookApi from "../sdk/books-api";
import { UpdateBookForm } from "../components/books/book-update-form";

const Home = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [bookData, setBookData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getAllBooks = useCallback(async () => {
    setIsLoading(true);
    await BookApi.getAllBooks()
      .then((response) => {
        console.log("response => ", response);
        if (response.status === 200) {
          setDataSource(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log("error => ", error));
  }, []);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  const getSingleBook = useCallback(async (bookId) => {
    setIsLoading(true);
    setOpenUpdateForm(true);
    await BookApi.getBookById(bookId)
      .then((response) => {
        console.log("response => ", response);
        if (response.status === 200) {
          setBookData(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log("error =>", error));
  }, []);

  return (
    <>
      <Helmet title="Home" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" spacing={2}>
              <Grid item>
                <Typography variant="h4">Welcome!</Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  onClick={() => setOpenAddForm(true)}
                >
                  Add New Book
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              {dataSource.map((data) => (
                <Grid key={data.uuid} item md={4} xs={12}>
                  <BookCard
                    data={data}
                    setOpenUpdateForm={setOpenUpdateForm}
                    getSingleBook={getSingleBook}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Add Form */}
      <Dialog open={openAddForm}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Add New Product
          <IconButton onClick={() => setOpenAddForm(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <AddBookForm />
        </DialogContent>
      </Dialog>
      {console.log("bookData => ", bookData)}
      {/* UpdateForm */}
      <Dialog open={openUpdateForm}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Update Book - {bookData && bookData.title ? bookData.title : ''}
          <IconButton onClick={() => setOpenUpdateForm(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <UpdateBookForm
            data={bookData}
            setOpenUpdateForm={setOpenUpdateForm}
            loading={isLoading}
            title={bookData && bookData.title ? bookData.title : ''}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
