const CollapsedNote = ({ date, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-wgray-300 w-full h-12 rounded shadow hover:shadow-md"
    >
      {date}
    </button>
  );
};

export default CollapsedNote;
