import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BookCart = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveFav = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_URL}/api/v1/delete-book-from-fav`,
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error removing book from favorites:", error);
      toast.error("Failed to remove book from favorites. Please try again.");
    }
  };
  return (
    <>
      <div className="bg-zinc-800 rounded p-4 flex flex-col">
        <Link to={`/view-book-details/${data._id}`}>
          <div className="bg-zinc-800 p-4 rounded flex flex-col">
            <div className="bg-zinc-900 rounded flex items-center justify-center">
              <img src={data.url} alt="image" className="h-[25vh]" />
            </div>
            <p className="mt-4 text-xl font-semibold text-white">
              {data.title.slice(0, 18)}...
            </p>
            <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
            <p className="mt-4 text-zinc-200 font-semibold text-xl">
              &#8377; {data.price}
            </p>
          </div>
        </Link>
        {favourite && (
          <button
            className="bg-[#108F9E] px-4 py-2 rounded  text-[#D6E7F1"
            onClick={handleRemoveFav}
          >
            Remove
          </button>
        )}
      </div>
    </>
  );
};

export default BookCart;
