import { Link } from "react-router-dom";

const EmailSent = () => {
  return (
    <div className="flex flex-col justify-center md:p-[30px] rounded-[10px] align-center w-[80%] md:w-[50%] lg:w-[40%] bg-black md:bg-[var(--primary-color)] gap-[20px] my-[20px]">
      <main className="w-[100%] flex flex-col justify-center gap-[10px]">
        <h1 className="borderAnim mx-auto text-[var(--secondary-color)] ">
          Email Sent Successfully
        </h1>
        <Link
          to="/"
          className="mt-[20px] w-[88%] mx-auto hover:cursor-pointer justify-center text-center text-bold flex text-black bg-[var(--secondary-color)] border-0 py-2 px-6 focus:outline-none rounded-[10px] text-lg font-extrabold"
          id="submit"
        >
          Back to Login Page
        </Link>
      </main>
      <footer className="mt-[20px] flex flex-col gap-[20px] align-center justify-center text-center w-[100%]">
        <div className="gap-[20px]">
          <p className="text-[var(--primary-color)] font-bold hover:cursor-pointer">
            Don't have an account?
          </p>
          <Link
            to="/register"
            className="underline mt-[20px] hover:cursor-pointer text-[var(--accent-color)]"
          >
            Sign up for Melodia
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default EmailSent;
