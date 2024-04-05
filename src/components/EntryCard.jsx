import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**Card for top-level display of entries
 * @param {string} name
 * @param {string} cardId - Mongoose ObjectId of entry,
 * @param {string} [image} - Optional. Path to image for entry.
 * @param {string} type - "object","location","campaign" - Type of entry to display.
 */
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

EntryCard.propTypes = {
  name: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string,
};

export default EntryCard;
