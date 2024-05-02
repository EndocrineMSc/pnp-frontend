import EntryCard from "./EntryCard";
import PropTypes from "prop-types";

/**Container component for Entry Cards.
 * @param {string} title
 * @param {Array.<Object>} cards - Data objects of entries to be displayed.
 * @param {string} type - "campaign","location","object" - Type of entry to be displayed.
 */
const EntryCardLayout = ({ title, cards, type }) => {
  return (
    <div className="static flex flex-col pl-4 pr-4 gap-5 w-full h-full">
      <h2 className="text-5xl mt-3">{title}</h2>
      <div className="flex flex-wrap w-full mb-10 gap-5">
        {cards.map((card) => {
          return (
            <EntryCard
              name={card.name}
              cardId={card._id}
              image={card.image}
              type={type}
              key={card._id}
            />
          );
        })}
      </div>
    </div>
  );
};

EntryCardLayout.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default EntryCardLayout;
