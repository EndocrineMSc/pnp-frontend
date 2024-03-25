import { Link } from "react-router-dom";

const EntryCard = ({ name, cardId, image, type }) => {
  const imagePath = image ? image : `./public/${type}.svg`;

  return (
    <Link
      to={`/${type}`}
      className=" lex flex-col w-48 h-48 items-center justify-start bg-wgray-200
      overflow-clip rounded-xl cursor-pointer shadow-md hover:shadow-xl"
    >
      <h3 className="flex justify-center w-full text-xl leading-relaxed">
        {name}
      </h3>
      <img
        src={imagePath}
        alt={type + " image"}
        className="w-48 h-auto bg-gradient-to-t from-wgray-400 to-wgray-500"
      />
    </Link>
  );
};

export default EntryCard;
