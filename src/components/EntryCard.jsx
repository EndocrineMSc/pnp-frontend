import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import unescapeText from "../utilityFunctions/unescapeText";
import Icon from "@mdi/react";
import useDefaultImage from "../hooks/useDefaultImage";

/**Card for top-level display of entries
 * @param {string} name
 * @param {string} cardId - Mongoose ObjectId of entry,
 * @param {string} [image} - Optional. Path to image for entry.
 * @param {string} type - "object","location","campaign" - Type of entry to display.
 */
const EntryCard = ({ name, cardId, image, type }) => {
  const defaultImage = useDefaultImage(type);

  const headerJustify = () => {
    if (name) {
      const nameArr = name.split("");
      return nameArr.length > 20 ? "justify-start" : "justify-center";
    }
  };

  const modifiedName = () => {
    const unescapedName = unescapeText(name);
    const nameArr = unescapedName.split("");

    if (nameArr.length <= 20) return unescapedName;

    const truncArr = nameArr.slice(0, 17);
    truncArr.push("...");
    return truncArr.join("");
  };

  return (
    <Link
      to={`/${type}/${cardId}`}
      className="flex flex-col w-card-image h-auto items-center justify-start
      overflow-clip rounded-xl cursor-pointer shadow-md hover:shadow-xl relative"
    >
      <h3
        className={`flex ${headerJustify()} w-full h-10 text-xl leading-relaxed text-center truncate bg-wgray-200/80 pt-1 px-2`}
      >
        {modifiedName()}
      </h3>
      {image ? (
        <img
          src={image}
          alt={type + " image"}
          className="w-card-image h-card-image"
        />
      ) : (
        <Icon
          className="w-card-image h-card-image bg-gradient-to-t from-wgray-400 to-wgray-500"
          path={defaultImage}
        />
      )}
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
