import React from "react";
import "./Nav.css";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CakeIcon from "@mui/icons-material/Cake";
import VideocamIcon from "@mui/icons-material/Videocam";
import CollectionsIcon from "@mui/icons-material/Collections";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

function Nav() {
  return (
    <div className="nav">
      <Tooltip title="Family Tree">
        <Link to="/person/1">
          <FamilyRestroomIcon />
        </Link>
      </Tooltip>
      <Tooltip title="Birthdays">
        <Link to="/birthdays">
          <CakeIcon />
        </Link>
      </Tooltip>
      <Tooltip title="Videos">
        <Link to="/videos">
          <VideocamIcon />
        </Link>
      </Tooltip>
      <Tooltip title="Photo Albums">
        <Link to="/albums">
          <CollectionsIcon />
        </Link>
      </Tooltip>
      <Tooltip title="Games">
        <VideogameAssetIcon />
      </Tooltip>
      <Tooltip title="New Person Form">
        <Link to="/add">
          <PersonAddAlt1Icon />
        </Link>
      </Tooltip>
      <Tooltip title="Vote">
        <HowToVoteIcon />
      </Tooltip>
    </div>
  );
}

export default Nav;
