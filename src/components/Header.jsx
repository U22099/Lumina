import Avatar from "./Avatar";
import { MdLogout } from "react-icons/md";
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import fetchUserData from '../utils/fetchUserData'

const Header = () => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState("https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");
  const [userName, setUsername] = useState("Daniel");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetchUserData(setLoading, setUserImage, setUsername, navigate)
  },[])
  return (
    <header className="flex items-center justify-between min-h-12 max-h-16 h-12 w-full bg-gray-100 dark:bg-[var(--accent-color)] px-7 md:px-20">
      <div className="flex items-center">
        <img
          src="logo.jpg"
          className="w-10 h-10 object-cover rounded-md"
          alt="Lumina logo"
        />
        <span className="text-black dark:text-white comic-neue-bold block ml-4">Lumina AI</span>
      </div>
      <div className="flex">
        <Avatar userName={userName} userImage={userImage} setUserImage={setUserImage}/>
        <div className="flex justify-start items-center">
          <MdLogout className="w-6 h-6 fill-black dark:fill-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
