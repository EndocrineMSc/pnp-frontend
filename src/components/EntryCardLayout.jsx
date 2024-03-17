import EntryCard from "./EntryCard";

const EntryCardLayout = ({ title, cards, type }) => {
  return (
    <div className="static flex flex-col pl-4 pr-4 gap-5 w-full h-full">
      <h2 className="text-5xl mt-3">{title}</h2>
      <div className="flex flex-wrap w-full mb-10 gap-5">
        {cards.map((card) => {
          return (
            <EntryCard
              name={card.name}
              cardId={card.id}
              image={card.image}
              type={type}
              key={card.id}
            />
          );
        })}
      </div>
      <div className="self-center absolute bottom-0">
        Default Icons made from{" "}
        <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed
        by CC BY 4.0
      </div>
    </div>
  );
};

export default EntryCardLayout;
