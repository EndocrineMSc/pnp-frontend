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
      className="flex flex-col w-card-image h-auto items-center justify-start
      overflow-clip rounded-xl cursor-pointer shadow-md hover:shadow-xl relative"
    >
      <h3 className="flex justify-center w-full text-xl leading-relaxed text-center bg-wgray-200/80">
        {name}
      </h3>
      <img
        src={imagePath}
        alt={type + " image"}
        className="w-card-image h-card-image bg-gradient-to-t from-wgray-400 to-wgray-500"
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
