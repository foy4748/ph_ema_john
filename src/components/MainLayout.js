import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MealsContainer() {
  return (
    <>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </>
  );
}
