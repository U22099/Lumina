import PropTypes from "prop-types";
const Avatar = ({ userImage, userName }) => {
  return (
    <div className="flex items-center justify-between mr-7">
      <img
        className="inline-block h-12 w-12 rounded-full"
        src={
          userImage ||
          "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
        alt="user avatar"
      />
      <span className="mx-2">{userName}</span>
    </div>
  );
};

Avatar.propTypes = {
  userImage: PropTypes.string,
  userName: PropTypes.string,
};

export default Avatar;
