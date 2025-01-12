import React, { useState } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { FaSearchengin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import { Logo } from "../assets";
import { Projects, SignUp } from "../container";
import { useSelector } from "react-redux";
import { UserProfileDetails } from "../components";
const Home = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const user = useSelector((state) => state.user?.user);

  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? "w-2" : "flex[.07] xl:flex-[.15]"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-150 ease-in-out`}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6  flex items-center justify-center cursor-pointer"
        >
          {!isSideMenu ? (
            <HiChevronDoubleLeft className="text-white text-xl" />
          ) : (
            <HiChevronDoubleRight className="text-white text-xl" />
          )}
        </motion.div>

        <div className="overflow-hidden w-full flex flex-col gap-4 ">
          <Link to={"/home"}>
            <img src={Logo} alt="Logo" className="object-contain w-45 h-auto" />
          </Link>

          <Link to={"/newCanvas"}>
            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200 ">
              <p className=" text-gray-400 group-hover:text-gray-200 capitalize">
                Start Coding
              </p>
            </div>
          </Link>
          {user && (
            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200 ">
              <Link
                to={"/home/projects"}
                className="flex justify-center  text-gray-400 group-hover:text-gray-200  "
              >
                Home
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-screen max-h-screen overflow-y-hidden h-full flex flex-col items-start justify-start px-2 md:px-10 py-6 md:py-6">
        <div className="w-full flex items-center justify-between gap-3 ">
          <div className="bg-secondary w-full px-2 py-2 rounded-md flex items-center justify-center gap-3">
            <FaSearchengin className="text-2xl text-primaryText"></FaSearchengin>
            <input
              type="text"
              className="flex-1 px-4 py-0 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
              placeholder="Search here.."
            />
          </div>

          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3 "
            >
              <Link
                to={"/home/auth"}
                className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
              >
                SignUp
              </Link>
            </motion.div>
          )}
          {user && <UserProfileDetails />}
        </div>
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
