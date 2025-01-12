import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Menus, signOutAction } from "../utils/helpers";
import { Link } from "react-router-dom";
import { slideUpDown } from "../animations";
const UserDetailsProvider = () => {
  const user = useSelector((state) => state.user?.user);
  const [isMenu, setisMenu] = useState(false);
  return (
    <div className="flex justify-center items-center gap-4 relat{...slideUpDown}ive">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-black">
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={user.photoURL}
              alt={user.displayName}
              referrerPolicy="no-referrer "
              onError={(e) => console.log(user.photoURL)}
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>

      <motion.div
        onClick={() => setisMenu(!isMenu)}
        whileTap={{ scale: 0.8 }}
        className="px-4 py-4 rounded-md flex items-center justify-center bg-secondary  cursor-pointer"
      >
        {!isMenu && <FaChevronDown className="text-primaryText" />}
        {isMenu && <FaChevronUp className="text-primaryText" />}
      </motion.div>
      <AnimatePresence>
        {isMenu && (
          <motion.div
            {...slideUpDown}
            className="absolute bg-secondary top-20 right-5 px-4 py-3 rounded-xl shadow-md z-20 text-left flex flex-col items-start justify-start gap-3 min-w-[175px] "
          >
            {Menus &&
              Menus.map((menu) => (
                <Link
                  to={menu.uri}
                  key={menu.id}
                  className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
                >
                  {menu.name}
                </Link>
              ))}
            <motion.p
              onClick={signOutAction}
              whileTap={{ scale: 0.9 }}
              className="text-primaryText text-lg
          hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
            >
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDetailsProvider;
