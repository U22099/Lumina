import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
import storage from "./utils/localStorage.js";
import origin from "../config/origin.json";
import { setToken } from "./utils/token.js";

const LogIn = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const reverse = () => {
    setShow(!show);
  };
  const [error, setError] = useState("");
  const [text, setText] = useState("Log In");
  const auth = async (e) => {
    e.preventDefault();
    const input = document.getElementById("input");
    const pwd = document.getElementById("pwd");
    const check = document.getElementById("checkbox").checked;
    if (input && pwd) {
      try {
        setText(
          <div id="load">
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
        const url = `${origin.default.origin}/auth`;
        const response = await axios.post(
          url,
          {
            input: input.value.trim(),
            password: pwd.value.trim(),
            rememberMe: check,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const Atoken = response.data.accessToken;
        const Rtoken = response.data.refreshToken;
        setToken("__A", Atoken);
        setToken("__R", Rtoken);
        setToken("_ID", response.data._id);
        if (response.status === 200) {
          storage.setValue("logged", true);
          navigate("/homepage", { replace: true });
        }
      } catch (err) {
        console.log(err);
        const data = err.response.data;
        setError(data.message);
        setText("Log in");
      }
    } else {
      setError("No username or password");
    }
  };
  useEffect(() => {
    const logged = storage.getValue("logged");
    if (logged) navigate("/homepage", { replace: true });
  }, []);

  return (
    <div className="flex flex-col justify-center md:p-[30px] rounded-[16px] align-center w-[80%] md:w-[70%] lg:w-[50%] bg-white dark:bg-black md:border-[var(--secondary-color)] md:border-[2px] gap-[20px] my-[20px]">
      <header className="flex justify-start text-start w-[100%]">
        <h1 className="text-[2em] md:text-[3em] text-[var(--secondary-color)] comic-neue-bold">
          Log in to Lumina
        </h1>
      </header>
      <form
        action=""
        method="post"
        className="w-[100%] flex flex-col justify-start gap-[10px]"
      >
        <input
          className="input comic-neue-bold "
          type="text"
          id="input"
          placeholder="Email or username"
        />
        <div className="relative text-center w-[100%] flex justify-start align-center">
          <input
            className="input comic-neue-bold"
            id="pwd"
            type={show ? "text" : "password"}
            placeholder="Password"
          />
          {show ? (
            <FaEyeSlash
              className="absolute top-[40%] cursor-pointer left-[82%] transform scale-[1.2] fill-[var(--secondary-color)] dark:fill-white"
              onClick={reverse}
            />
          ) : (
            <FaEye
              className="absolute cursor-pointer top-[40%] left-[82%] transform scale-[1.2] fill-[var(--secondary-color)] dark:fill-white"
              onClick={reverse}
            />
          )}
        </div>
        <p className={error === "" ? "hidden" : "text-[0.8em] text-red-500"}>
          {error}
        </p>
        <div className="flex mt-[10px] gap-[10px] justify-start w-[100%]">
          <input
            type="checkbox"
            name="Rem"
            id="checkbox"
            className="accent-[var(--secondary-color)] transform scale-[1.3] hover:cursor-pointer"
          />
          <label
            htmlFor="checkbox"
            className="comic-neue-regular text-[0.9em] text-black dark:text-white"
          >
            Remember me
          </label>
        </div>
        <button
          onClick={auth}
          className="mt-[20px] w-[88%] mx-auto hover:cursor-pointer justify-center text-center text-bold flex text-black bg-[var(--secondary-color)] border-0 py-2 px-6 focus:outline-none rounded-[10px] text-[1.5em] comic-neue-bold"
          id="submit"
        >
          {text}
        </button>
      </form>
      <footer className="mt-[20px] flex flex-col gap-[20px] align-center justify-center text-center w-[100%]">
        <Link
          to="/forgotPassword"
          className="comic-neue-regular underline my-[10px] hover:cursor-pointer dark:text-white text-black"
        >
          Forgot your password
        </Link>
        <div className="gap-[20px]">
          <p className="text-[var(--accent-color-2)] hover:cursor-pointer comic-neue-regular">
            Don&apos;t have an account?
          </p>
          <Link
            to="/register"
            className="text-[var(--accent-color-2)] underline mt-[20px] hover:cursor-pointer"
          >
            Sign up for Lumina
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LogIn;
