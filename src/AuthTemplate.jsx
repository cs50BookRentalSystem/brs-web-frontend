import { Outlet } from "react-router-dom";

import ErrSnackBar from "./components/ErrSnackBar";

export default function AuthTemplate() {
  return (
    <>
      <Outlet />
      <ErrSnackBar />
    </>
  );
}
