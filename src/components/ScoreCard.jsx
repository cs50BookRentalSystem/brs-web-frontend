import { Box, Typography } from "@mui/material";

export default function ScoreCard({ title, value }) {
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      gap={1}
      sx={{ minWidth: 200 }}
    >
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h5">{value}</Typography>
    </Box>
  );
}
