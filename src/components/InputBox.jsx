import { IoMdSend, IoMdAttach } from "react-icons/io";

const InputBox = () => {
  const handleFileChange = (e) => {
    console.log(e.target.files[0].name);
  };
  const autoResize = (e) => {
	   e.target.style.height = "16px";
              e.target.style.height = `${e.target.scrollHeight}px`;
  }
  return (
    <div className="bg-gray-100 rounded-full border-0 ring-1 ring-inset ring-transparent  focus:ring-inset focus:ring-indigo-600 focus:ring-3 focus-within:ring-inset focus-within:ring-[var(--secondary-color)] dark:bg-[var(--accent-color)] w-[90%] py-2 px-4 flex fixed left-[5%] bottom-6 md:bottom-10 h-fit">
      <textarea
        rows={1}
        type="text"
        className="resize-none bg-none bg-transparent outline-none w-full placeholder:font-semibold comic-neue-bold text-black dark:text-white mx-8 my-auto h-4 max-h-20"
        onKeyPress={autoResize}
		  onKeyUp={autoResize}
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
