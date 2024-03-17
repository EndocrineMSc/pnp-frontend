import EntryCardLayout from "../components/EntryCardLayout";

const testLocations = [
  { name: "Markarth", image: null },
  { name: "Riften", image: null },
  { name: "Windhelm", image: null },
  { name: "Solitude", image: null },
  { name: "Whiterun", image: null },
  { name: "Winterhold", image: null },
  { name: "Dawnstar", image: null },
  { name: "Falkreath", image: null },
];

const Locations = () => {
  return (
    <EntryCardLayout cards={testLocations} type="location" title="Locations" />
  );
};

export default Locations;
