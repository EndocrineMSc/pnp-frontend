const SubmitButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="w-36 h-10 rounded-md shadow bg-wgray-400 hover:bg-wgray-500"
    >
      {text ? text : "Submit"}
    </button>
  );
};

export default SubmitButton;
