import CollapseButton from "./basic-ui/CollapseButton";

const CollapsedNavBar = ({showNavBar}) => {
  return(
    <div className="absolute left-0 top-0">
      <CollapseButton toggleCollapse={showNavBar} />
    </div>
  )
}

export default CollapsedNavBar;