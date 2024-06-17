import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AddBooks = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const chage = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("All field required");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/api/v1/add-book`,
          data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="h-[100%] p-0 md:p-4">
        <p className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
          Add Book
        </p>
        <div className="p-4 bg-zinc-800 rounded">
          <div>
            <label htmlFor="image" className="text-zinc-400">
              Image
            </label>
            <input
              type="text"
              id="image"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="url of image"
              name="url"
              required
              value={data.url}
              onChange={chage}
            />
          </div>
          <div>
            <label htmlFor="title" className="text-zinc-400">
              Title of Book
            </label>
            <input
              type="text"
              id="title"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Title of book"
              name="title"
              required
              value={data.title}
              onChange={chage}
            />
          </div>
          <div>
            <label htmlFor="author" className="text-zinc-400">
              Author of Book
            </label>
            <input
              type="text"
              id="author"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="author of book"
              name="author"
              required
              value={data.author}
              onChange={chage}
            />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="w-3/6">
              <label htmlFor="language" className="text-zinc-400">
                Language
              </label>
              <input
                type="text"
                id="language"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="language of book"
                name="language"
                required
                value={data.language}
                onChange={chage}
              />
            </div>
            <div className="w-3/6">
              <label htmlFor="price" className="text-zinc-400">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="Price of book"
                name="price"
                required
                value={data.price}
                onChange={chage}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="desc" className="text-zinc-400">
              Description of Book
            </label>
            <textarea
              name="desc"
              id="desc"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="Description of book"
              value={data.desc}
              onChange={chage}
              required
            />
          </div>
          <button
            className="mt-4 px-3 bg-[#108F9E] text-[#D6E7F1] font-semibold py-2 rounded hover:text-[#108F9E] hover:bg-[#D6E7F1] transition-all duration-300"
            onClick={submit}
          >
            Add Book
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBooks;
