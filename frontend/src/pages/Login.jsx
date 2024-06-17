import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function changeHandler(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  const submitHandler = async () => {
    try {
      if (values.username === "" || values.password === "") {
        toast.error("All fields are required");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/api/v1/sign-in`,
          values
        );

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
        console.log(response);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      console.log("Error in submission", error);
    }
  };
  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center min-h-[90vh]">
      {console.log(values)}
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Log In</p>
        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              id="username"
              value={values.username}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              id="password"
              value={values.password}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-[#108F9E] text-white font-semibold py-2 rounded hover:text-[#108F9E] hover:bg-[#D6E7F1] transition-all duration-300"
              onClick={submitHandler}
            >
              Login
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            New User? &nbsp;
            <Link to="/signup" className="hover:text-[#108F9E] text-blue-300">
              <u>Sign Up</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
