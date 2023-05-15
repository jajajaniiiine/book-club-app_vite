import { Box, Card, Skeleton } from "@mui/material";


export const CardLoading = () => {

  return (
    <Card sx={{ width: '15vw' }}>
      <Skeleton variant="rectangular" height={118} />
      <Box sx={{ p: 1 }}>
        <Skeleton width="60%" />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    </Card>
  );
};
