import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import origin from "../config/origin.json";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [text, setText] = useState("Submit Email");
  const navigate = useNavigate();
  const auth = async (e) => {
    e.preventDefault();
    const input = document.getElementById("input");
    if (input) {
      try {
        setText(<a id="roll1"></a>);
        const url = origin.default.origin + "/forgotPassword";
        const response = await axios.post(
          url,
          {
            input: input.value,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          navigate("/emailSent", { replace: true });
        }
      } catch (err) {
        const data = err.response.data;
        setError(data.message || "Error");
        setText("Submit Email");
      }
    } else {
      setError("Input Email");
    }
  };
  return (
    <div className="flex flex-col justify-center md:p-[30px] rounded-[16px] align-center w-[80%] md:w-[50%] lg:w-[40%] dark:bg-black md:border-[var(--secondary-color)] md:border-[2px]  gap-[20px] my-[20px]">
      <header className="flex justify-start text-start w-[100%]">
        <h1 className="text-[2em] md:text-[3em] text-[var(--secondary-color)] comic-neue-bold">
          Request New Password
        </h1>
      </header>
      <form
        action=""
        method="post"
        className="w-[100%] flex flex-col justify-start gap-[10px]"
      >
        <input
          className="input comic-neue-bold"
          type="email"
          id="input"
          placeholder="Email"
        />
        <p
          className={
            error === "" ? "hidden" : "text-[0.8em] font-bold text-red-500"
          }
        >
          {error}
        </p>
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
          to="/"
          className="underline mb-[10px] hover:cursor-pointer comic-neue-bold"
        >
          Log In to Lumina
        </Link>
        <div className="gap-[20px]">
          <p className="text-[var(--accent-color-2)] font-bold hover:cursor-pointer comic-neue-bold">
            Don't have an account?
          </p>
          <Link
            to="/register"
            className="underline mt-[20px] hover:cursor-pointer text-[var(--accent-color-2)]"
          >
            Sign up for Lumina
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;
