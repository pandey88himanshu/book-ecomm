import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  function changeHandler(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  const submitHandler = async () => {
    try {
      // Check for empty fields
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === ""
      ) {
        toast.error("All fields are required");
        return; // Exit the function early if fields are missing
      }

      // Make the API request
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/v1/sign-up`,
        values
      );

      // Handle successful response
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      // Handle the error response
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }

      // Log the entire error for debugging purposes
      console.error("Error in submission:", error);
    }
  };

  return (
    <>
      <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
        <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-xl">Sign Up</p>
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
              <label htmlFor="email" className="text-zinc-400">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="email"
                name="email"
                id="email"
                value={values.email}
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
              <label htmlFor="address" className="text-zinc-400">
                Address
              </label>
              <textarea
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="address"
                name="address"
                id="address"
                value={values.address}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="mt-4">
              <button
                className="w-full bg-[#108F9E] text-white font-semibold py-2 rounded hover:text-[#108F9E] hover:bg-[#D6E7F1] transition-all duration-300"
                onClick={submitHandler}
              >
                Sign Up
              </button>
            </div>
            <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
              Or
            </p>
            <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
              Already have an account? &nbsp;
              <Link to="/login" className="hover:text-[#108F9E] text-blue-300">
                <u>LogIn</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
