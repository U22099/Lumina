import PropTypes from "prop-types";
import {motion } from 'framer-motion';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiOutlineClear} from 'react-icons/ai';
import { MdLogout, MdDelete } from "react-icons/md";
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import Avatar from "./Avatar";
import useChat from '../store.js';
import logOut from '../utils/logOut.js';
import deleteUser from '../utils/deleteUser.js';
import clearChats from '../utils/clearChats.js';
import getAiImage from '../utils/getAiImage.js';
import fetchUserData from '../utils/fetchUserData';
import ConfirmDialog from '../utils/dialogs/ConfirmDialog.jsx';

const Header = ({userName, userImage, setUserName, setUserImage}) => {
  const navigate = useNavigate();
  const setChat = useChat((state) => state.setChat);
  const [aiImage, setAiImage] = useState("logo.jpg");
  const [menu, setMenu] = useState(false);
  const [del, setDel] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetchUserData(setLoading, setUserImage, setUserName, navigate);
    //getAiImage(setAiImage);
  },[]);
  return (
    <header className="flex items-center justify-between min-h-14 max-h-20 h-14 w-full bg-gray-100 dark:bg-[var(--accent-color)] px-4 md:px-16 py-5 md:py-8">
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
          <div id="load" className="w-14 h-14 flex mt-4 h-full items-center">
            <div></div>
            <div></div>
            <div></div> 
          </div>
          : <Avatar userName={userName} userImage={userImage} setUserImage={setUserImage}/>
        }
        <div className="flex justify-start items-center md:gap-4">
          <span title="Clear chat"><AiOutlineClear className="w-6 h-6 fill-black dark:fill-white hidden md:flex cursor-pointer" onClick={async () => await clearChats(setChat, navigate)}/></span>
          <span title="Log Out"><MdLogout className="w-6 h-6 fill-black dark:fill-white hidden md:flex cursor-pointer" onClick={async () => await logOut(navigate)} /></span>
          <span title="Delete User"><MdDelete className="w-6 h-6 fill-black dark:fill-white hidden md:flex cursor-pointer" onClick={() => setDel(true)}/></span>
          {
          menu ? 
          <FaAngleRight arial-label="Open Menu" className="w-6 h-6 fill-black dark:fill-white flex md:hidden cursor-pointer" onClick={()=> setMenu(false)}/> 
          : 
          <FaAngleLeft arial-label="Open Menu" className="w-6 h-6 fill-black dark:fill-white flex md:hidden cursor-pointer" onClick={()=> setMenu(true)}/>
          }
        </div>
        {menu ? <Menu menu={menu} setDel={setDel}/> : ''}
      </div>
      {del ? <ConfirmDialog var2={setDel} callback={deleteUser} msg={"Are you sure ?"}/> : ''}
    </header>
  );
};

const Menu = ({ menu, setDel}) => {
  const navigate = useNavigate();
  const setChat = useChat((state) => state.setChat);
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
        key={menu} className="absolute top-[10%] flex gap-4 bg-gray-100 dark:bg-[var(--accent-color)] rounded-md shadow-md p-2">
            <span title="Clear chat"><AiOutlineClear className="w-7 h-7 fill-black dark:fill-white cursor-pointer" onClick={async () => await clearChats(setChat, navigate)}/></span>
            <span title="Log Out"><MdLogout className="w-7 h-7 fill-black dark:fill-white cursor-pointer" onClick={async () => await logOut(navigate)} /></span>
            <span title="Delete User"><MdDelete className="w-7 h-7 fill-black dark:fill-white cursor-pointer" onClick={() => setDel(true)}/></span>
        </motion.div>

  )
}
Menu.propTypes = {
  menu: PropTypes.bool,
  del: PropTypes.bool,
  setDel: PropTypes.func
};
Header.propTypes = {
  userName: PropTypes.string,
  userImage: PropTypes.string,
  setUserName: PropTypes.func,
  setUserImage: PropTypes.func,
}
export default Header;
