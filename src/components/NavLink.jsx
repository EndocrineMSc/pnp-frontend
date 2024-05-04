import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**Link component that links to a specific route
 * @param {string} path - Single page app route destination
 * @param {string} text - Link text
 */
const NavLink = ({ path, text, onClick }) => {
  const [isInFocus, setInFocus] = useState(false);

  useEffect(() => {
    const location = window.location.href;
    setInFocus(location.includes(path));
  }, [path, window.location.href]);

  return (
    <Link
      to={path}
      className={`w-full h-16 flex items-center pl-4 rounded-l-xl text-2xl leading-loose hover:bg-wgray-400 active:bg-wgray-400 ${isInFocus ? "bg-wgray-400" : ""}`}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavLink;
