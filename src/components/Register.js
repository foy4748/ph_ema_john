import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../App";

import styles from "./Register.module.css";

export default function Register({ registerHandler }) {
  //Executing Hooks
  const { setActiveUser } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    registerHandler(email, password)
      .then((result) => {
        setActiveUser(result);
        form.reset();
        navigate(location?.state?.from || "/", { replace: true });
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h1>Register</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form style={{ marginTop: "5rem" }} onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
          <button type="submit">Register</button>
          <p>
            Already have an account? Please,{" "}
            <NavLink to="/login" replace>
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
