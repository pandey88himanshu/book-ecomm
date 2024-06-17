import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "../book cart/BookCart";
import Loader from "../loader/Loader";
import { FaBookmark } from "react-icons/fa";

const Favourites = () => {
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/v1/get-fav-books`,
          { headers }
        );
        setFav(response.data.data);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [fav]); // Dependency array is empty to run the effect only once on mount

  return (
    <>
      <div>
        {loading ? (
          <div className="lg:min-h-[100vh] md:min-h-[100vh] h-[50vh] w-auto flex items-center justify-center flex-col gap-3">
            <Loader />
          </div>
        ) : fav.length > 0 ? (
          <div>
            <p className="text-5xl font-semibold text-zinc-500 mb-8">
              Favourites
            </p>
            <div className="flex items-center flex-wrap gap-4">
              {fav.map((item, key) => (
                <div key={key}>
                  <BookCart data={item} favourite={true} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="lg:min-h-[100vh] md:min-h-[100vh] h-[50vh] w-auto flex items-center justify-center flex-col gap-3">
            <p className="text-xl font-semibold flex items-center justify-center gap-6">
              No Book Available <FaBookmark />
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Favourites;
