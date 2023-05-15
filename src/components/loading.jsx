import { Box, Card, Skeleton } from "@mui/material";


export const CardLoading = () => {

  return (
    <Card sx={{ width: '20vw' }}>
      <Skeleton variant="rectangular" width={210} height={118} />
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
