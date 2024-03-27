import { Link } from "react-router-dom";

const EntryCard = ({ name, cardId, image, type }) => {
  const imagePath = image ? image : `/${type}.svg`;

  return (
    <Link
      to={`/${type}/${cardId}`}
      className=" lex flex-col w-[200px] aspect-square items-center justify-start bg-wgray-200
      overflow-clip rounded-xl cursor-pointer shadow-md hover:shadow-xl"
    >
      <h3 className="flex justify-center w-full text-xl leading-relaxed text-center">
        {name}
      </h3>
      <img
        src={imagePath}
        alt={type + " image"}
        className="w-[200px] h-auto bg-gradient-to-t from-wgray-400 to-wgray-500"
      />
    </Link>
  );
};

export default EntryCard;
