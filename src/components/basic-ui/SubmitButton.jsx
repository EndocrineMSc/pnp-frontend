import PropTypes from "prop-types";

/**Submit button for forms
 * @param {function} onClick - Parent callback function.
 * @param {string} [text="Submit"] - Button text, defaults to "Submit".
 */
const SubmitButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-2 right-2 w-36 h-10 rounded-md shadow bg-wgray-400 hover:bg-wgray-500"
    >
      {text}
    </button>
  );
};

SubmitButton.defaultProps = {
  text: "Submit",
};

SubmitButton.propTypes = {
  onClick: PropTypes.func,
};

export default SubmitButton;
