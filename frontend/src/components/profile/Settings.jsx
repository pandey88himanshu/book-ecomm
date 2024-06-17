import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
const Settings = () => {
  const [values, setvalues] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/v1/get-user-info`,
          { headers }
        );
        setProfileData(response.data);
        setvalues({ address: response.data.address });
      } catch (error) {
        toast.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setvalues({
      ...values,
      [name]: value,
    });
  };
  const clickHandler = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_URL}/api/v1/update-address`,
      values,
      { headers }
    );
    toast.success(response.data.message);
  };
  return (
    <>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <p className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </p>
          <div className="flex flex-wrap gap-12">
            <div className="">
              <label htmlFor="username">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="email">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="address">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="address"
              name="address"
              value={values.address}
              id="address"
              onChange={changeHandler}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={clickHandler}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
