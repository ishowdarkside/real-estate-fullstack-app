import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <h1>NAV</h1>
      <Outlet />
      <h2>FOOTER</h2>
    </>
  );
}
