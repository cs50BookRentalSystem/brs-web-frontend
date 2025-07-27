import { Snackbar, SnackbarContent } from "@mui/material";

import { useApp } from "../App";

export default function ErrSnackBar() {
  const { globalErrMsg, setGlobalErrMsg } = useApp();
  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      open={Boolean(globalErrMsg)}
      autoHideDuration={6000}
      onClose={() => setGlobalErrMsg(null)}
    >
      <SnackbarContent
        message={globalErrMsg}
        sx={{
          backgroundColor: "#d32f2f",
          color: "white",
          fontWeight: 500,
          px: 2,
          py: 1,
          borderRadius: 1,
        }}
      />
    </Snackbar>
  );
}
