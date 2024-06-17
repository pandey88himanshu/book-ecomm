import React, { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/v1/get-user-cart`,
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_URL}/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    toast.success(response.data.message);
  };
  useEffect(() => {
    if (cart && cart.length > 0) {
      let sum = 0;
      cart.map((item) => {
        sum += item.price;
      });
      setTotal(sum);
      sum = 0;
    }
  }, [cart]);

  const placeOrder = async () => {
    try {
      console.log("Placing order with cart:", cart);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/v1/place-order`,
        { order: cart },
        { headers }
      );
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      toast.error("Error placing order:", error);
    }
  };
  return (
    <>
      <div className="bg-zinc-900 px-12 h-screen py-8">
        {!cart && (
          <div className="w-full h-[100%] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {cart && cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <p className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                Empty Cart
              </p>
              <img
                src="https://i.ibb.co/51KdqCB/shopping.png"
                alt="empty cart"
                className="lg:h-[50vh]"
              />
            </div>
          </div>
        )}
        {cart && cart.length > 0 && (
          <>
            <p className="text-5xl font-semibold text-zinc-500 mb-8">
              Your Cart
            </p>
            {cart.map((item, key) => (
              <div
                className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                key={key}
              >
                <img
                  src={item.url}
                  alt="product image"
                  className="h-[20vh] md:h-[10vh] object-cover"
                />
                <div className="w-full md:w-auto">
                  <p className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                    {item.title}
                  </p>
                  <p className="text-zinc-300 mt-2 hidden lg:block">
                    {item.desc.slice(0, 100)}...
                  </p>
                  <p className="text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {item.desc.slice(0, 65)}...
                  </p>
                  <p className="text-zinc-300 mt-2 md:hidden block">
                    {item.desc.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <p className="text-zinc-100 text-3xl font-semibold flex">
                    &#8377; {item.price}
                  </p>
                  <button
                    className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                    onClick={() => deleteItem(item._id)}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        {cart && cart.length > 0 && (
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <p className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </p>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <p>{cart.length} books</p>
                <p>&#8377; {total}</p>
              </div>
              <div className="w-[100%] mt-3">
                <button
                  className="bg-[#108F9E] text-[#D6E7F1] rounded px-4 py-2 flex justify-center w-full font-semibold hover:text-[#108F9E] hover:bg-zinc-200  transition-all duration-300"
                  onClick={placeOrder}
                >
                  Place Your Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
