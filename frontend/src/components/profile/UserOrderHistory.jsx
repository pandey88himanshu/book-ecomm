import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/v1/get-order-history`,
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        toast.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {!orderHistory && (
        <div className="flex items-center justify-center h-[100vh]">
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <p className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </p>
            <img
              src="https://i.ibb.co/TvyWRWZ/11669671-20943865-prev-ui.png"
              alt="no order"
              className="h-[20vh] mv-8"
            />
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <p className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </p>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <p className="text-center">SR.</p>
            </div>
            <div className="w-[22%]">
              <p className="">Books</p>
            </div>
            <div className="w-[45%]">
              <p className="">Description</p>
            </div>
            <div className="w-[9%]">
              <p className="">Price</p>
            </div>
            <div className="w-[16%]">
              <p className="">Status</p>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <p className="text-center">Model</p>
            </div>
          </div>
          {orderHistory.map((item, key) => {
            return (
              <div
                key={item.book._id}
                className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
              >
                <div className="w-[3%]">
                  <h1 className="text-center">{key + 1}</h1>
                </div>
                <div className="w-[22%] ">
                  <Link
                    to={`/view-book-details/${item.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {item.book.title}
                  </Link>
                </div>
                <div className="w-[45%]">
                  <h1 className="">{item.book.desc.slice(0, 50)} ...</h1>
                </div>
                <div className="w-[9%]">
                  <h1 className=""> {item.book.price}</h1>
                </div>
                <div className="w-[16%]">
                  <p className="font-semibold text-green-500">
                    {item.status === "Order Placed" ? (
                      <div className="text-green-500 ">{item.status}</div>
                    ) : item.status === "Canceled" ? (
                      <div className="text-red-500 ">{item.status}</div>
                    ) : (
                      item.status
                    )}
                  </p>
                </div>
                <div className="w-none md:w-[5%] hidden md:block">
                  <p className="text-sm text-zinc-400">COD</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
