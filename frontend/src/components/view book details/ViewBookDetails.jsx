import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoLanguage } from "react-icons/io5";
import Loader from "../loader/Loader";
import { IoIosHeart } from "react-icons/io";
import { IoIosCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const ViewBookDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFav = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_URL}/api/v1/add-book-to-fav`,
      {},
      { headers }
    );
    toast.success(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_URL}/api/v1/add-to-cart`,
      {},
      { headers }
    );
    toast.success(response.data.message);
  };
  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_URL}/api/v1/delete-book`,
        { headers }
      );
      toast.success(response.data.message);
      navigate("/all-books");
    } catch (error) {
      console.error("There was an error deleting the book!", error);
      toast.error("Failed to delete the book. Please try again.");
    }
  };
  return (
    <>
      {data ? (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col lg:flex-row">
          <div className="  w-full  lg:w-3/6 ">
            <div className=" flex flex-col lg:flex-row items-center justify-around bg-zinc-800 rounded py-12">
              <img
                src={data.url}
                alt="book image"
                className="h-[50vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className=" flex md:flex-row items-center justify-between lg:justify-center flex-row lg:flex-col mt-4 lg:mt-8 ">
                  <button
                    className="flex items-center justify-center pr-3"
                    onClick={handleFav}
                  >
                    <IoIosHeart className="bg-white rounded lg:rounded-full text-5xl p-2 text-red-500" />
                  </button>
                  <button
                    className="flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <IoIosCart className="bg-white rounded lg:rounded-full text-5xl p-2 mt-0 lg:mt-4 text-blue-500" />
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex md:flex-row items-center justify-between lg:justify-center flex-row lg:flex-col mt-4 lg:mt-8 ">
                  <Link
                    to={`/updateBook/${id}`}
                    className="flex items-center justify-center pr-3"
                  >
                    <MdEdit className="bg-white rounded lg:rounded-full text-5xl p-2 text-blue-500 " />
                  </Link>
                  <button
                    className="flex items-center justify-center"
                    onClick={deleteBook}
                  >
                    <MdDelete className="bg-white rounded lg:rounded-full text-5xl p-2 mt-0 lg:mt-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="py-4 text-white  w-full lg:w-3/6">
            <p className="text-4xl text-zinc-300 font-semibold">{data.title}</p>
            <p className="text-zinc-400 mt-1">by {data.author} </p>
            <p className="text-zinc-500 mt-4 text-xl"> {data.desc} </p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <IoLanguage className="me-3" /> {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : &#8377; {data.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-[100vh]  flex items-center justify-center bg-zinc-900">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
