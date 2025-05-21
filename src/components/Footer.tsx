import React from "react";
import { Paper } from "@mui/material";

const Footer: React.FC = () => {
  const numberOfVerbs = localStorage.getItem("numberOfVerbs");
  const APP_VERSION = import.meta.env.VITE_APP_VERSION;
  return (
    <div className="App-footer">
      <Paper elevation={0} sx={{ display: "flex" }}>
        <div className="App-footer-author">Author: Oleksandr_Z</div>
        <div className="App-footer-version">
          {`v${APP_VERSION}-${numberOfVerbs}`}
        </div>
      </Paper>
    </div>
  );
};

export default Footer;
