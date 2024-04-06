import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**Link component that links to a specific route
 * @param {string} path - Single page app route destination
 * @param {string} text - Link text
 * @param {function} onClick - Parent callback function (for styling)
 * @param {string} className - State dependent styling (e.g. bg-color)
 */
const NavLink = ({ path, text, onClick, className }) => {
  return (
    <Link
      to={path}
      className={
        "w-full h-16 flex items-center pl-4 rounded-l-xl text-2xl leading-loose hover:bg-wgray-400 active:bg-wgray-400 " +
        className
      }
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

NavLink.defaultProps = {
  className: "",
};

NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavLink;
