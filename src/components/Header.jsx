import Avatar from "./Avatar";
import { MdLogout, MdDelete } from "react-icons/md";
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import {AiOutlineClear} from 'react-icons/ai';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import fetchUserData from '../utils/fetchUserData';

const Header = () => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState("");
  const [userName, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(()=>{
    fetchUserData(setLoading, setUserImage, setUsername, navigate);
  },[]);
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
        {loading ? 
          <div id="load" className="w-8 h-8 m-none">
            <div></div>
            <div></div>
            <div></div> 
          </div>
          : <Avatar userName={userName} userImage={userImage} setUserImage={setUserImage}/>
        }
        <div className="flex justify-start items-center gap-8">
          <AiOutlineClear arial-label="Clear chat" className="w-6 h-6 fill-black dark:fill-white hidden md:visible"/>
          <MdLogout arial-label="Log Out" className="w-6 h-6 fill-black dark:fill-white hidden md:visible" />
          <MdDelete arial-label="Delete User" className="w-6 h-6 fill-black dark:fill-white hidden md:visible"/>
          {
          menu ? 
          <FaAngleRight arial-label="Open Menu" className="w-6 h-6 fill-black dark:fill-white visible md:hidden" onClick={()=> setMenu(false)}/> 
          : 
          <FaAngleLeft arial-label="Open Menu" className="w-6 h-6 fill-black dark:fill-white visible md:hidden" onClick={()=> setMenu(true)}/>
          }
        </div>
        <div className={(menu ? '': "hidden ") +"absolute top-[100%]"}>
          <div className="flex">
            <Avatar userName={userName} userImage={userImage} setUserImage={setUserImage}/>
          </div>
          <div className="flex gap-8">
            <AiOutlineClear arial-label="Clear chat" className="w-6 h-6 fill-black dark:fill-white"/>
            <MdLogout arial-label="Log Out" className="w-6 h-6 fill-black dark:fill-white" />
            <MdDelete arial-label="Delete User" className="w-6 h-6 fill-black dark:fill-white "/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
