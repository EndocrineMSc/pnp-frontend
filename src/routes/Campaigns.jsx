import EntryCardLayout from "../components/EntryCardLayout";

const testCampaigns = [
  { name: "Embers", image: null },
  { name: "Discovery Island", image: null },
  { name: "Trailblazer", image: null },
  { name: "Curse of Strahd", image: null },
  { name: "Mirrors Edge", image: null },
  { name: "The Fellowship", image: null },
];

const Campaigns = () => {
  return (
    <EntryCardLayout cards={testCampaigns} type="campaign" title="Campaigns" />
  );
};

export default Campaigns;
