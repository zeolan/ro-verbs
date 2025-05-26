import { useSelector } from "react-redux";

import {
  getVerbs,
} from "../store/reducer.ts";

const Footer: React.FC = () => {
  // const numberOfVerbs = localStorage.getItem("numberOfVerbs");
  const APP_VERSION = import.meta.env.VITE_APP_VERSION;
  const numberOfVerbs = useSelector(getVerbs).length;

  return (
    <div className="App-footer" data-testid="footer">
      <div className="App-footer-author" data-testid="footer-author">Author: Oleksandr_Z</div>
      <div className="App-footer-version" data-testid="footer-version">
        {`v${APP_VERSION}-${numberOfVerbs}`}
      </div>
    </div>
  );
};

export default Footer;
