import Header from "./components/Header";
import Message from "./components/Message";
import InputBox from "./components/InputBox";

const App = () => {
  return (
    <div className="h-screen md:h-dvh w-full dark:bg-[var(--primary-color)] bg-white mx-auto relative">
      <Header />
      <Message />
      <InputBox />
    </div>
  );
};

export default App;
