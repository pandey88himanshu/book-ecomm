import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="h-[75vh] flex items-center justify-center flex-col md:flex-row ">
        <div className="mb-12 md:mb-0 w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
          <p className="text-4xl lg:text-6xl font-semibold text-[#F69661] text-center lg:text-left">
            Discover Your Next Great Read
          </p>
          <p className="mt-4 text-xl text-[#D6E7F1] text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ducimus
            fugit tenetur aut excepturi dolorem totam voluptas vero labore
            necessitatibus! Lorem ipsum dolor sit amet.
          </p>
          <div className="mt-8">
            <Link
              to="/all-books"
              className="text-[#D6E7F1] text-xl lg:text-2xl font-semibold hover:border hover:border-[#108F9E] hover:bg-transparent px-10 py-3 bg-[#108F9E] rounded-full"
            >
              Discover Books
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
          <img src="./hero.png" alt="hero_img" />
        </div>
      </div>
    </>
  );
};

export default Hero;
