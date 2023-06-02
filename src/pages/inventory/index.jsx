import { Box, Button, Card, Chip, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { DataTable } from "../../components/table";
import { Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import BookApi from "../../sdk/books-api";

export const Inventory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Book Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      render: (value) => (
        <>
          {value.map((tag, index) => {
            console.log(tag)
            return (
              <Chip key={index} label={tag?.value ? tag.value.toUpperCase() : tag.toUpperCase()} />
            );
          })}
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => (
        <>
          {value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <Button variant="contained" size="medium">
            View
          </Button>
          <Button variant="contained" size="medium">
            Edit
          </Button>
          <Button variant="outlined" size="medium" color="error">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const getAllBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      await BookApi.getAllBooks()
        .then((books) => {
          if (books.status === 200) {
            const data = books.data.map((item) => {
              return {
                key: item._id,
                ...item,
              };
            });
            setDataSource(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  return (
    <>
      <Helmet title="Inventory" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 2 }}>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item>
                <Typography variant="h4">Inventory</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained">Add new book</Button>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Card>
              <DataTable columns={columns} rows={dataSource} loading={isLoading} />
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};
