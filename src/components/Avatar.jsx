import PropTypes from "prop-types";
import toBase64 from '../utils/base64';
import { useNavigate } from 'react-router-dom'
import updateImage from '../utils/updateImage';

const Avatar = ({ userImage, userName, setUserImage}) => {
  const navigate = useNavigate();
  const handleFileChange = async (e) => {
    console.log(e.target.files[0].name);
    const data = await toBase64(e.target.files[0]);
    setUserImage(data);
    await updateImage(data, navigate);
  };
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="user-image">
          <input type="file" id="user-image" hidden onClick={handleFileChange}/>
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={
            userImage
          }
          alt="user avatar"
        />
      </label>
      <span className="mx-2 comic-neue-bold text-black dark:text-white">{userName}</span>
    </div>
  );
};

Avatar.propTypes = {
  userImage: PropTypes.string,
  userName: PropTypes.string,
  setUserImage: PropTypes.func
};

export default Avatar;
