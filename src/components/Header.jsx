import PropTypes from "prop-types";
import {motion } from 'framer-motion';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiOutlineClear} from 'react-icons/ai';
import { MdLogout, MdDelete } from "react-icons/md";
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import Avatar from "./Avatar";
import logOut from '../utils//logOut.js';
import deleteUser from '../utils/deleteUser.js';
import clearChats from '../utils/clearChats.js';
import getAiImage from '../utils/getAiImage.js';
import fetchUserData from '../utils/fetchUserData';
import ConfirmDialog from '../utils/dialogs/ConfirmDialog.jsx';

const Header = () => {
  const navigate = useNavigate();
  const [aiImage, setAiImage] = useState();
  const [userImage, setUserImage] = useState("");
  const [userName, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(()=>{
    fetchUserData(setLoading, setUserImage, setUsername, navigate);
    const data = getAiImage();
    setAiImage(data);
  },[]);
  return (
    <header className="flex items-center justify-between min-h-12 max-h-16 h-12 w-full bg-gray-100 dark:bg-[var(--accent-color)] px-4 md:px-16">
      <div className="flex items-center">
        <img
          src={aiImage}
          className="w-10 h-10 object-cover rounded-md"
          alt="Lumina logo"
        />
        <span className="text-black dark:text-white comic-neue-bold block ml-4">Lumina AI</span>
      </div>
      <div className="flex items-center justify-end gap-2">
        {loading ? 
          <div id="load" className="w-8 h-8">
            <div></div>
            <div></div>
            <div></div> 
          </div>
          : <Avatar userName={userName} userImage={userImage} setUserImage={setUserImage}/>
        }
        <div className="flex justify-start items-center md:gap-4">
          <span title="Clear chat"><AiOutlineClear className="w-6 h-6 fill-black dark:fill-white hidden md:flex cursor-pointer" onClick={async () => await clearChats()}/></span>
          <span title="Log Out"><MdLogout className="w-6 h-6 fill-black dark:fill-white hidden md:flex cursor-pointer" onClick={async () => await logOut()} /></span>
          <span title="Delete User"><MdDelete className="w-6 h-6 fill-black dark:fill-white hidden md:flex cursor-pointer" onClick={() => setDel(true)}/></span>
          {
          menu ? 
          <FaAngleRight arial-label="Open Menu" className="w-6 h-6 fill-black dark:fill-white flex md:hidden cursor-pointer" onClick={()=> setMenu(false)}/> 
          : 
          <FaAngleLeft arial-label="Open Menu" className="w-6 h-6 fill-black dark:fill-white flex md:hidden cursor-pointer" onClick={()=> setMenu(true)}/>
          }
        </div>
        {menu ? <Menu userName={userName} userImage={userImage} setUserImage={setUserImage} menu={menu} setDel={setDel}/> : ''}
      </div>
      {del ? <ConfirmDialog var2={setDel} callback={deleteUser} msg={"Are you sure ?"}/> : ''}
    </header>
  );
};

const Menu = ({userName, userImage, setUserImage, menu, setDel}) => {
  return(
    <motion.div 
        initial={{
          x: 100,
          opacity: 0
        }}
        animate={{
          x: 0,
          opacity: 1
        }}
        transition={{
          type: "spring"
        }}
        key={menu} className="absolute top-[8%] flex flex-col gap-2 bg-gray-100 dark:bg-[var(--accent-color)] rounded-md shadow-[1px_1px_9px_1px_rgba(0,0,0,0.3),inset_1px_2px_3px_1px_rgba(0,0,0,0.1)] p-2">
          <div className="flex">
            <Avatar userName={userName} userImage={userImage} setUserImage={setUserImage} menu={menu}/>
          </div>
          <div className="flex gap-4">
            <span title="Clear chat"><AiOutlineClear className="w-6 h-6 fill-black dark:fill-white cursor-pointer" onClick={async () => await clearChats()}/></span>
            <span title="Log Out"><MdLogout className="w-6 h-6 fill-black dark:fill-white cursor-pointer" onClick={async () => await logOut()} /></span>
            <span title="Delete User"><MdDelete className="w-6 h-6 fill-black dark:fill-white cursor-pointer" onClick={() => setDel(true)}/></span>
          </div>
        </motion.div>

  )
}
Menu.propTypes = {
  userImage: PropTypes.string,
  userName: PropTypes.string,
  setUserImage: PropTypes.func,
  menu: PropTypes.bool,
  del: PropTypes.bool,
  setDel: PropTypes.func
};
export default Header;
