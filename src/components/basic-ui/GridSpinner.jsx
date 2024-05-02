import { Grid } from "react-loader-spinner";

const GridSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#306cce"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default GridSpinner;
