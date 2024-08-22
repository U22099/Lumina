import Header from "./components/Header";
import InputBox from "./components/InputBox";

const App = () => {
  return (
    <div className="h-full md:h-dvh w-full dark:bg-[var(--primary-color)] bg-white mx-auto relative">
      <Header />
      <InputBox />
    </div>
  );
};

export default App;
