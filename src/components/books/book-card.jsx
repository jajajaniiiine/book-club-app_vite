/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { AddShoppingCart, Edit, Favorite } from "@mui/icons-material";
import numeral from "numeral";
import { Link } from "react-router-dom";

export const BookCard = (props) => {
  const { data } = props;

  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
      <CardContent sx={{ textAlign: "left" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 600 }}>{data.title}</Typography>
          <Stack direction="row">
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton>
              <AddShoppingCart />
            </IconButton>
            <IconButton>
              <Link to={{
                pathname: `/books/edit/${data.bookId}`,
              }}>
                <Edit />
              </Link>
            </IconButton>
          </Stack>
        </Box>
        <Typography sx={{ fontSize: 14 }}>
          Author: <Chip label={data.author} />
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
          align="justify"
        >
          Description: {data.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          Category:
          {data &&
            data.category.map((category, index) => (
              <Chip key={index} label={category.label ? category.label : category } />
            ))}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          Price: <Chip label={numeral(data.price).format("$0,0.00")} />
        </Typography>
      </CardContent>
    </Card>
  );
};
