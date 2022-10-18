import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../App";

//import styles from "./Login.module.css";

export default function Login({ loginHandler }) {
  //Executing Hooks
  const { setActiveUser } = useContext(userContext);
  const [error, setError] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginHandler(email, password)
      .then((result) => {
        setActiveUser(result);
        form.reset();
        navigate(location?.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };
  return (
    <div>
      <h1>Login</h1>
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
          <p>{error}</p>
          <button type="submit">Login</button>
          <p>
            Don't have any account ? Please,{" "}
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
