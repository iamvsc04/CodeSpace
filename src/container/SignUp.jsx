import React, { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithGitHub, signInWithGoogle } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log(userCred);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loginWithEmail = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log(userCred);
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMsg("Invalid Id:User not found");
          } else if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMsg("Password Mismatch");
          } else {
            setAlert(true);
            setAlertMsg("Temporarily failed ");
          }

          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };
  return (
    <div className="w-full">
      <img
        src={Logo}
        alt="Logo"
        className="object-contain w-32 opacity-30 h-auto mt-5 "
      />

      <div className="w-100 flex flex-col items-center justify-center py-8">
        <p className="py-3 text-xl text-primaryText">Join With Us! </p>
        <div
          className="px-5 w-75 md:w-75 py-3 rounded-xl bg-secondary 
        shadow-md flex flex-col items-center justify-center gap-4"
        >
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />
          {/* This is for alert section */}

          <AnimatePresence>
            {alert && (
              <motion.p
                className="text-red-500"
                key={"AlertMessage"}
                {...fadeInOut}
              >
                {alertMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {!isLogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full 
          py-3 rounded-xl hover:bg-emerald-400 bg-emerald-500 text-white text-lg cursor-pointer"
            >
              <p className="text-xl text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmail}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full 
        py-3 rounded-xl hover:bg-emerald-400 bg-emerald-500 text-white text-lg cursor-pointer"
            >
              <p className="text-xl text-white">Login</p>
            </motion.div>
          )}

          {/* Account text  */}

          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already Have an account!{" "}
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
                className="text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Don't Have an account!{" "}
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
                className="text-emerald-500 cursor-pointer"
              >
                Create Here
              </span>
            </p>
          )}

          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]"> OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          <motion.div
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.5)] cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in With Google</p>
          </motion.div>

          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]"> OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          <motion.div
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.5)] cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign in With GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
