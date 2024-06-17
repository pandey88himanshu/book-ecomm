import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

const NavBar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if (isLoggedIn == true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn == true && role === "admin") {
    links.splice(3, 1);
  }
  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav
        className={`z-50 relative bg-zinc-800 text-white px-8 py-2 flex items-center justify-between`}
      >
        <Link to="/" className={`text-2xl font-semibold flex items-center`}>
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="book logo"
          />
          <p>BookHeaven</p>
        </Link>
        <div className={`${styles.links} md:flex gap-4 items-center block`}>
          <div className="hidden md:flex gap-4">
            {links.map((items, key) => (
              <div className="flex items-center">
                {items.title === "Profile" ||
                items.title === "Admin Profile" ? (
                  <Link
                    to={items.link}
                    key={key}
                    className="px-4 py-1 bg-[#108F9E] rounded hover:bg-[#D6E7F1] hover:text-zinc-800 transition-all duration-300"
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    key={key}
                    className="hover:text-[#108F9E] transition-all duration-300 cursor-pointer"
                  >
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-4 py-1 border border-[#108F9E] rounded  hover:bg-[#D6E7F1] hover:text-zinc-800 transition-all duration-300
            "
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 bg-[#108F9E] rounded hover:bg-[#D6E7F1] hover:text-zinc-800 transition-all duration-300
            "
              >
                SignUp
              </Link>
            </div>
          )}
          <button
            className="text-white text-2xl hover:text-zinc-400 md:hidden"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} flex flex-col items-center justify-center w-full absolute left-0 top-0 bg-zinc-800 h-screen z-40`}
      >
        {links.map((items, key) => (
          <Link
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
            to={items.link}
            key={key}
            className="text-white text-4xl mb-8 font-semibold  hover:text-[#108F9E] transition-all duration-300 cursor-pointer"
          >
            {items.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              onClick={() =>
                MobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
              to="/login"
              className={` ${MobileNav} px-8 py-2 mb-8 text-3xl border border-[#108F9E] rounded text-[#D6E7F1] hover:bg-[#D6E7F1] hover:text-zinc-800 transition-all duration-300
            `}
            >
              LogIn
            </Link>
            <Link
              onClick={() =>
                MobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
              to="/signup"
              className={`${MobileNav} px-8 py-2 mb-8 text-3xl text-[#D6E7F1] bg-[#108F9E] rounded hover:bg-[#D6E7F1] hover:text-zinc-800 transition-all duration-300
            `}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default NavBar;
