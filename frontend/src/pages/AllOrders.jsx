import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { FaUserAlt, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import SetUserData from "./SetUserData";
import { toast } from "react-toastify";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { id } = useParams();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/v1/get-all-orders`,
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetch();
  }, [allOrders]);

  const [option, setOption] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (key) => {
    const id = allOrders[key]._id;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_URL}/api/v1/update-status/${id}`,
        { status: values.status },
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      {!allOrders.length ? (
        <div className="h-[100%] flex items-center justify-center gap-3 flex-col">
          <p className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            No Order Avilable
          </p>
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <p className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </p>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <p className="text-center">SR.</p>
            </div>
            <div className="w-[22%]">
              <p>Books</p>
            </div>
            <div className="w-[45%]">
              <p>Description</p>
            </div>
            <div className="w-[9%]">
              <p>Price</p>
            </div>
            <div className="w-[16%]">
              <p>Status</p>
            </div>
            <div className="w-[100%] md:w-[5%]">
              <p>
                <FaUserAlt />
              </p>
            </div>
          </div>
          {allOrders.map((items, key) => (
            <div
              key={key}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-[3%]">
                <p className="text-center">{key + 1}</p>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <p>{items.book.desc.slice(0, 50)}...</p>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <p>&#8377; {items.book.price}</p>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <p className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOption(key)}
                  >
                    {items.status === "Order Placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  {option === key && (
                    <div className="flex">
                      <select
                        name="status"
                        id="status"
                        className="bg-gray-800"
                        value={values.status}
                        onChange={change}
                      >
                        {[
                          "Order Placed",
                          "Out For Delivery",
                          "Delivered",
                          "Canceled",
                        ].map((status, index) => (
                          <option value={status} key={index}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-green-500 hover:text-pink-600 mx-2"
                        onClick={() => {
                          setOption(-1);
                          submitChanges(key);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </p>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  <FaExternalLinkAlt />
                </button>
              </div>
            </div>
          ))}
          {userDivData && (
            <SetUserData
              userDivData={userDivData}
              userDiv={userDiv}
              setUserDiv={setUserDiv}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
