import EntryCardLayout from "../components/EntryCardLayout";

const testCharas = [
  { name: "Sephiroth", image: null },
  { name: "Cloud", image: null },
  { name: "Tifa", image: null },
  { name: "Zidane", image: null },
  { name: "Lightning", image: null },
  { name: "Behemoth", image: null },
];

const Characters = () => {
  return (
    <EntryCardLayout cards={testCharas} type="character" title="Characters" />
  );
};

export default Characters;
