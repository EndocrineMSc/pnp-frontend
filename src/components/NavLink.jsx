import { Link } from "react-router-dom";

const NavLink = ({ path, text, onClick, className }) => {
  return (
    <li
      className={
        "w-full h-16 flex items-center pl-4 rounded-l-xl text-2xl leading-loose hover:bg-wgray-400 active:bg-wgray-400 " +
        className
      }
      onClick={onClick}
    >
      <Link to={path}>{text}</Link>
    </li>
  );
};

export default NavLink;
