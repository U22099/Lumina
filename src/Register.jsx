import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import origin from "../config/origin.json";

const Register = () => {
  const [error, setError] = useState("");
  const [image, setImage] = useState();
  const [text, setText] = useState("Sign up");
  const navigate = useNavigate();
  const upload = async () => {
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const pwd = document.getElementById("pwd");
    const input = document.getElementById("input");
    if (username && email && pwd && input) {
      try {
        setText(<a id="roll1"></a>);
        const DATA = {
          username: username.value,
          email: email.value,
          password: pwd.value,
          image: image,
        };
        const url = origin.default.origin + "/register";
        const response = await axios.post(url, DATA, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const Lumina = JSON.parse(localStorage.getItem('Lumina')) || {
            logged: true
          }
          localStorage.setItem('Lumina', JSON.stringify(Lumina));
          navigate("/homepage", { replace: true, state: { fromRoute: true } });
          setError("");
        }
      } catch (err) {
        console.log(err);
        const data = err.response.data;
        setError(data.message);
        setText("Sign up");
      }
    } else {
      setError("An Error occured");
    }
  };
  const handleImage = async (e) => {
    const data = e.target.files[0]
      ? await imagebase64(e.target.files[0])
      : await imagebase64("image.JPG");
    setImage(data);
  };
  const imagebase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data;
  };
  return (
    <div className="my-[30px] flex flex-col justify-start md:p-[30px] p-[0px] rounded-[16px] overflow-hidden overflow-y-scroll scrollbar h-[100vh] align-center w-[80%] md:w-[50%] lg:w-[40%] dark:bg-black md:border-[var(--secondary-color)] md:border-[2px] gap-[20px] my-[40px]">
      <header className="flex justify-start text-start w-[100%]">
        <h1 className="text-[2em] md:text-[3em] text-[var(--secondary-color)] comic-neue-bold">
          Welcome to Lumina
        </h1>
      </header>
      <main className="w-[100%] flex flex-col justify-start gap-[10px]">
        <div className="flex justify-center items-center flex-col">
          <input
            type="file"
            onChange={handleImage}
            maxLength={3145728}
            accept="image/jpeg, image/png, image/jpg"
            id="input"
            className="hidden"
          />
          <div className=" rounded-[100%] flex justify-center align-center items-center bg-[var(--primary-color)]  text-black w-[200px] h-[200px]">
            {image ? (
              <img
                src={image}
                className="w-[200px] h-[200px] rounded-[100%]  cursor-pointer"
                onClick={() => document.getElementById("input").click()}
              />
            ) : (
              <FaUser
                className=" rounded-[100%] flex justify-center align-center items-center dark:bg-[var(--primary-color)] text-black text-[12em] pt-[10px] cursor-pointer fill-white"
                onClick={() => document.getElementById("input").click()}
              />
            )}
          </div>
          <label
            htmlFor="input"
            className="underline text-[1.3em] cursor-pointer text-[var(--accent-color-2)] comic-neue-bold "
          >
            Add Photo
          </label>
        </div>
        <input className="input" type="email" id="email" placeholder="Email" />
        <input
          className="input comic-neue-bold"
          type="text"
          id="username"
          placeholder="Username"
        />
        <input
          className="input comic-neue-bold"
          type="password"
          id="pwd"
          placeholder="Password"
        />
        <p
          className={
            error === "" ? "hidden" : "text-[0.8em] font-bold text-red-500"
          }
        >
          {error}
        </p>
        <button
          onClick={upload}
          className="mt-[20px] w-[88%] mx-auto hover:cursor-pointer justify-center text-center text-bold flex text-black bg-[var(--secondary-color)] border-0 py-2 px-6 focus:outline-none rounded-[10px] text-[1.5em] comic-neue-bold"
          id="submit"
        >
          {text}
        </button>
      </main>
      <footer className="mt-[20px] flex flex-col gap-[20px] align-center justify-center text-center w-[100%]">
        <p className="text-[var(--primary-color)] font-bold hover:cursor-pointer">
          Already have an account?
        </p>
        <Link
          to="/"
          className="underline hover:cursor-pointer text-[var(--primary-color)]"
        >
          Sign in to Lumina
        </Link>
      </footer>
    </div>
  );
};

export default Register;
