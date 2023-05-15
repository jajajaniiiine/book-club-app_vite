import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { BookCard } from "../components/books/book-card";
import { Add } from "@mui/icons-material";
import { AddBookForm } from "../components/books/book-add-form";
import BookApi from "../sdk/books-api";
import { CardLoading } from "../components/loading";

const Home = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBooks = useCallback(async () => {
    setIsLoading(true);
    await BookApi.getAllBooks()
      .then((response) => {
        console.log('response', response)
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
              {dataSource.map((data) =>
                isLoading ? (
                  <Grid item key={data.uuid} md={3} xs={12}>
                    <CardLoading key={data.uuid} />
                  </Grid>
                ) : (
                  <Grid key={data.uuid} item md={3} xs={12}>
                    <BookCard data={data} />
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Add Form */}
      <AddBookForm open={openAddForm} setOpenAddForm={setOpenAddForm} />
    </>
  );
};

export default Home;
