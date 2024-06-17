import React, { useEffect, useState } from "react";
import Sidebar from "../components/profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/loader/Loader";
import MobileNav from "../components/profile/MobileNav";
const Profile = () => {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/v1/get-user-info`,
          { headers: headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row min-h-screen py-8 gap-4 text-white">
        {profile ? (
          <>
            <div className="w-full md:w-1/6">
              <Sidebar data={profile} />
              <MobileNav />
            </div>
            <div className="w-full md:w-5/6">
              <Outlet />
            </div>
          </>
        ) : (
          <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
