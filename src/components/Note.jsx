const Note = ({ noteId, date, text }) => {
  return (
    <div className="min-w-96 max-w-prose shadow-md bg-wgray-100">
      <h3 className="text-center p-1 text-xl bg-gradient-to-b from-wgray-300 to-wgray-400">
        {date}
      </h3>
      <div className="p-2 whitespace-pre-line text-pretty">{text}</div>
    </div>
  );
};

export default Note;
