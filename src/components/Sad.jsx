import { Box, Typography } from "@mui/material";
import { SentimentVeryDissatisfied as SadIcon } from "@mui/icons-material";

export default function Sad({ msg }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <SadIcon />
      <Typography variant="subtitle2" color="text.secondary">
        {msg}
      </Typography>
    </Box>
  );
}
