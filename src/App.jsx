import Header from "./components/Header";
import SearchBox from "./components/SearchBox";

const App = () => {
  return (
    <div className="h-dvh w-full dark:bg-[var(--primary-color)] bg-white mx-auto relative">
      <Header></Header>
      <SearchBox />
    </div>
  );
};

export default App;
