import DeleteButton from "./basic-ui/DeleteButton";
import EditButton from "./basic-ui/EditButton";

/**Detail view component for Items and Locations, Campaigns and Characters are separate */
const DetailView = ({ viewData, type }) => {
  return (
    <div className="flex justify-center items-start w-full h-screen p-2">
      <div className="flex flex-col gap-3 p-4 bg-wgray-300 rounded-xl max-w-screen-sm">
        <div className="flex justify-center items-start gap-10">
          <img
            className="w-[150px] aspect-square bg-wgray-400 rounded-xl"
            src={viewData.image ? viewData.image : `./${type}.svg`}
            alt="location"
          />
        </div>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">{viewData.name}</h2>
          <div className="flex gap-2">
            <EditButton type={type} />
            <DeleteButton />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h3 className="font-semibold">Short Description</h3>
          <div className="bg-wgray-200 p-2 rounded">
            {viewData.short_description}
          </div>
          <h3 className="font-semibold">Long Description</h3>
          <div className="bg-wgray-200 p-2 rounded">
            {viewData.long_description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
