import EntryCardLayout from "../components/EntryCardLayout";

const testitems = [
  { name: "Mjolnir", image: null },
  { name: "Holy Hand Grenade", image: null },
  { name: "Infinity Gauntlet", image: null },
  { name: "Portal Gun", image: null },
  { name: "Gravity Gun", image: null },
  { name: "Gunblade", image: null },
];

const Items = () => {
  return <EntryCardLayout cards={testitems} type="item" title="Objects" />;
};

export default Items;
