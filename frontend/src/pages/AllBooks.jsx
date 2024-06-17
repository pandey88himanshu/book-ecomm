import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "../components/book cart/BookCart";
import Loader from "../components/loader/Loader";
const AllBooks = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/v1/get-all-books`
      );

      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      <div className="bg-zinc-900 min-h-[85vh] px-12 py-8">
        <p className="text-3xl text-[#F69661]">All Books</p>
        {!data && (
          <div className="flex items-center justify-center m-8">
            <Loader />
          </div>
        )}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {data &&
            data.map((item, key) => (
              <div key={key}>
                <BookCart data={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllBooks;
