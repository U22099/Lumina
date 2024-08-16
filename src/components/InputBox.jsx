import { IoMdSend, IoMdAttach } from "react-icons/io";

const InputBox = () => {
  const handleFileChange = (e) => {
    console.log(e.target.files[0].name);
  };

  return (
    <div className="bg-gray-200 rounded-full  border-0  ring-1 ring-inset ring-transparent  focus:ring-inset focus:ring-indigo-600   focus:ring-2 focus-within:ring-inset focus-within:ring-[var(--secondary-color)] dark:bg-[var(--accent-color-2)] w-[90%] py-3 px-5 flex fixed left-[5%] bottom-10">
      <input
        type="text"
        className="bg-none bg-transparent outline-none w-full placeholder:font-semibold comic-neue-regular"
        autoComplete="off"
        placeholder="Message Lumina"
        tabIndex={0}
      />

      <div className="flex items-center gap-4">
        <label
          htmlFor="custom-input"
          className="bg-[var(--accent-color)] p-4 rounded-full outline-0 cursor-pointer"
        >
          <input
            type="file"
            id="custom-input"
            onChange={(e) => handleFileChange(e)}
            hidden
          />
          <IoMdAttach className="scale-x-[-1] w-7 h-7" />
        </label>

        <button
          tabIndex={0}
          className="bg-[var(--secondary-color)] px-10 py-3 rounded-[2rem] outline-0"
        >
          <IoMdSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default InputBox;