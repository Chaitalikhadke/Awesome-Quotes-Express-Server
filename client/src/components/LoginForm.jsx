import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userSignIn } from "../services/users";
import { AuthContext } from "../App";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswdChange = (e) => setPasswd(e.target.value);

  const handleSignInClick = async (e) => {
    try {
      // validate user login using REST service
      const user = await userSignIn(email, passwd);
      // store user object + jwt token (in sessionStorage)
      sessionStorage.setItem("users", JSON.stringify(user));
      // update the context
      setUser(user);
      // after successful login, go to user dashboard
      navigate("/users");
    } catch (err) {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="col border border-3 shadow p-5 m-5">
      <div className="mb-3 text-center">
        <h2>Login Form</h2>
      </div>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          className="form-control"
          name="email"
          type="text"
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          className="form-control"
          name="passwd"
          type="password"
          onChange={handlePasswdChange}
        />
      </div>
      <div className="row">
        <button
          className="mx-5 col btn btn-primary"
          onClick={handleSignInClick}
        >
         sign in
        </button>
        <Link className="mx-5 col btn btn-secondary " to="/register">
        sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
