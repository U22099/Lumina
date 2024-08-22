import { IoMdSend, IoMdAttach } from "react-icons/io";

const InputBox = () => {
  const handleFileChange = (e) => {
    console.log(e.target.files[0].name);
  };

  return (
    <div className="bg-gray-100 rounded-full border-0  ring-1 ring-inset ring-transparent  focus:ring-inset focus:ring-indigo-600 focus:ring-3 focus-within:ring-inset focus-within:ring-[var(--secondary-color)] dark:bg-[var(--accent-color)] w-[90%] py-2 px-4 flex fixed left-[5%] bottom-12 md:bottom-10">
      <input
        type="text"
        className="bg-none bg-transparent outline-none w-full placeholder:font-semibold comic-neue-bold text-black dark:text-white"
        autoComplete="off"
        placeholder="Message Lumina"
        tabIndex={0}
      />

      <div className="flex items-center gap-4">
        <label
          htmlFor="custom-input"
          className="bg-[var(--accent-color-2)] p-3 rounded-full outline-0 cursor-pointer"
        >
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="custom-input"
            onChange={(e) => handleFileChange(e)}
            hidden
          />
          <IoMdAttach className="scale-x-[-1] w-4 h-4" />
        </label>

        <button
          tabIndex={0}
          className="bg-[var(--secondary-color)] px-8 py-2 rounded-[2rem] outline-0"
        >
          <IoMdSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
