const CollapseButton = ({toggleCollapse}) => {
  return (
    <button
      className=" w-10 h-10 rounded 
                  bg-gradient-to-b from-wgray-500 to-wgray-600 
                  hover:from-wgray-600 hover:to-wgray-700 
                  focus:from-wgray-700 focus:to-wgray-800"
      onClick={toggleCollapse}
    >
      &#60;&#60;
    </button>
  );
};

export default CollapseButton;
