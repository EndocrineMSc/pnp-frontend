import EntryCard from "./EntryCard";
import { Link } from "react-router-dom";
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
        {cards.length > 0 ? (
          cards.map((card) => {
            return (
              <EntryCard
                name={card.name}
                cardId={card._id}
                image={card.image}
                type={type}
                key={card._id}
              />
            );
          })
        ) : (
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">No entries.</h3>
            <div>
              If you haven't created a campaign yet, you need to do that first.
            </div>
            <div>Every other kind of entry needs to be part of a campaign.</div>
            <Link to="/campaigns" className="text-wgray-700 underline">
              Go to campaigns
            </Link>
          </div>
        )}
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
