import React, { useEffect, useState } from "react";
import "./Nav.css";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CakeIcon from "@mui/icons-material/Cake";
import VideocamIcon from "@mui/icons-material/Videocam";
import CollectionsIcon from "@mui/icons-material/Collections";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { jwtDecode } from "jwt-decode";

function Nav() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedToken = jwtDecode(jwt);
      setUserId(parseInt(decodedToken.sub));
    }
  }, []);

  return (
    <div className="nav">
      <Tooltip title="Home Page">
        <Link to={`/home`}>
          <HomeIcon />
        </Link>
      </Tooltip>
      <Tooltip title="Family Tree">
        <Link to={`/person/${userId}`}>
          <FamilyRestroomIcon />
        </Link>
      </Tooltip>
      <Tooltip title="New Person Form">
        <Link to="/add">
          <PersonAddAlt1Icon />
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
        <Link to="/games">
          <VideogameAssetIcon />
        </Link>
      </Tooltip>
      <Tooltip title="Contact">
        <Link to="/contact">
          <ContactSupportIcon />
        </Link>
      </Tooltip>
      <Tooltip title="Login">
        <Link to="/login">
          <VpnKeyIcon />
        </Link>
      </Tooltip>

      {/*
      <Tooltip title="Games">
        <Link to="/games">
          <VideogameAssetIcon />
        </Link>
      </Tooltip>

      <Tooltip title="Vote">
        <HowToVoteIcon />
      </Tooltip>
      */}
    </div>
  );
}

export default Nav;
