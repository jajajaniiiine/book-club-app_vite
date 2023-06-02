import { Box, Button, Card, Container, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import BookApi from "../../../sdk/books-api";
import { UpdateBookForm } from "../../../components/books/book-update-form";
import { ArrowBack } from "@mui/icons-material";

const UpdateBook = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [values, setValues] = useState();

  const getSingleBook = useCallback(async () => {
    await BookApi.getBookById(bookId)
      .then((res) => {
        if (res.status === 200) {
          setBook(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bookId]);

  useEffect(() => {
    getSingleBook();
  }, [getSingleBook]);

  if (!book) {
    return null;
  }

  const handleSubmit = async (id) => {
    await BookApi.updateBook(id, values)
      .then((res) => {
        if (res.status === 200) {
          setBook(res.data);
        }
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <>
      <Helmet title="Update Book" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Card sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  startIcon={<ArrowBack />}
                  variant="outlined"
                  size="large"
                  href="/dashboard"
                >
                  Back
                </Button>
              </Grid>
            </Box>
            <UpdateBookForm
              data={book}
              values={values}
              setValues={setValues}
              onSave={handleSubmit}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default UpdateBook;
