import PropTypes from "prop-types";
import toBase64 from '../utils/base64'
const Avatar = ({ userImage, userName, setUserImage }) => {
  const handleFileChange = async (e) => {
    console.log(e.target.files[0].name);
    const data = await toBase64(e.target.files[0]);
    setUserImage(data);
  };
  return (
    <div className="flex items-center justify-between mr-7">
      <label htmlFor="user-image">
        <input type="file" hidden onClick={handleFileChange}/>
        <img
          id="user-image"
          className="inline-block h-10 w-10 rounded-full"
          src={
            userImage
          }
          alt="user avatar"
        />
      </label>
      <span className="mx-2 comic-neue-bold text-black dark:text-white hidden md:visible">{userName}</span>
    </div>
  );
};

Avatar.propTypes = {
  userImage: PropTypes.string,
  userName: PropTypes.string,
  setUserImage: PropTypes.func,
};

export default Avatar;
