import { Link } from "react-router-dom";

/**Default view for logged-out users, displays app change-log */
const LandingPage = () => {
  return (
    <div className="p-5">
      <h1 className="text-5xl font-bold mb-3">Welcome!</h1>
      <div className=" text-xl">RPG Adventure Journal v0.1.0</div>
      <div className="text-s mb-5">Page last updated: 06. Jul. 2024</div>
      <div className="mb-5">
        <Link to="/login">
          <button
            type="button"
            className="w-20 h-10 bg-wgray-700 hover:bg-wgray-500 text-wgray-50 rounded-xl"
          >
            Login{" "}
          </button>
        </Link>
        <Link to="/register">
          <button className="w-20 h-10 bg-wgray-700 hover:bg-wgray-500 text-wgray-50 rounded-xl ml-5">
            Register
          </button>
        </Link>
      </div>
      <div className="mb-5">
        <p>
          This web app is still in development. This page will show you the
          newest feature additions and bug fixes.
        </p>
        <p>
          Below that, you can find a small roadmap for features, that are
          planned next.
        </p>
      </div>
      <h2 className="text-xl font-bold">New Features: </h2>
      <ul className="list-disc ml-5 mb-5 leading-7">
        <li>
          Register and Login Pages and functionality, as well as logout
          functionality
        </li>
        <li>
          Correct display of currently selected campaign in top left corner
        </li>
        <li>
          "Close" buttons for displayed notes (collapsing them back to the
          scrollbar)
        </li>
        <li>
          Clicking on collapsed note again, will also close the respective open
          note, if open
        </li>
        <li>
          Color change for collapsed notes, signifying which related note is
          currently open
        </li>
        <li>
          Image upload functionality for campaigns, characters, locations and
          objects
        </li>
      </ul>
      <h2 className="text-xl font-bold">Bug Fixes: </h2>
      <ul className="list-disc ml-5 mb-5 leading-7">
        <li>Add Button now always at correct, bottom-right position</li>
        <li>
          Forms for characters, campaigns and objects now look identical in
          different Browsers
        </li>
        <li>
          Links in left navigation bar are disabled if no user is logged in
        </li>
        <li>
          Links in left navigation bar now still show correct highlight even
          after page reload
        </li>
        <li>Text is now unescaped everywhere it needs to be</li>
      </ul>
      <h2 className="text-xl font-bold">Planned features for next update: </h2>
      <ul className="list-disc ml-5 mb-5 leading-7">
        <li>Complete rework of UI/UX</li>
        <li>Make app fully responsive and work on mobile</li>
      </ul>
      <h2 className="text-xl font-bold">
        Planned features for further updates:{" "}
      </h2>
      <ul className="list-disc ml-5 mb-5 leading-7">
        <li>Add a search functionality</li>
        <li>Enable linking to campaign, character and object in notes</li>
        <li>
          Showing tooltips with short descriptions when hovering over above
          mentioned links
        </li>
        <li>Enable campaign sharing between multiple users</li>
      </ul>
    </div>
  );
};

export default LandingPage;
