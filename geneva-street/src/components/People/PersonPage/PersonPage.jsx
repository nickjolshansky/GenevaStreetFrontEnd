import React, { useState, useEffect } from "react";
import "./PersonPage.css";
import { rootsrc, profilesrc } from "../../../utils/source.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonNameDisplay from "./PersonNameDisplay.jsx";
import { theme } from "../../../theme/theme.js";

function PersonPage() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [relationships, setRelationships] = useState(null);
  const [currentSiblingIndex, setCurrentSiblingIndex] = useState(0);
  const [parents, setParents] = useState([]);
  const [siblings, setSiblings] = useState([]);
  const [children, setChildren] = useState([]);
  const [partner, setPartner] = useState(null);

  // Fetch person data
  useEffect(() => {
    fetch(`${rootsrc}/people/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPerson(data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [id]);

  // Fetch person relationship data
  useEffect(() => {
    fetch(`${rootsrc}/Relationship/person/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRelationships(data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [id]);

  //relationship setup
  useEffect(() => {
    if (relationships) {
      setParents(
        relationships.filter((rel) => rel.relationshipType === "parent")
      );
      setSiblings(
        relationships.filter((rel) => rel.relationshipType === "sibling")
      );
      setChildren(
        relationships.filter((rel) => rel.relationshipType === "child")
      );
      setPartner(
        relationships.filter((rel) => rel.relationshipType === "partner")[0] ??
          null
      );

      setCurrentSiblingIndex(0);
    } else {
      setParents([]);
      setSiblings([]);
      setChildren([]);
      setPartner(null);
    }
  }, [relationships]);

  let currentSibling = siblings[currentSiblingIndex];
  const handleSiblingPrev = () => {
    setCurrentSiblingIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : siblings.length - 1
    );
  };

  const handleSiblingNext = () => {
    setCurrentSiblingIndex((prevIndex) =>
      prevIndex < siblings.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="grid-container">
      {/* PARENTS */}
      <div
        className={`grid-item parent-box ${
          parents.length === 0 ? "empty" : ""
        }`}
      >
        <div className="label">Parents</div>
        <div className="people-flex">
          {parents.length !== 0 &&
            parents.map((parent) => (
              <div className="people-grid" key={parent.person.id}>
                <Link
                  key={parent.person.id}
                  to={`/person/${parent.person.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    key={parent.person.id}
                    src={`${profilesrc}${parent.person.picture}`}
                    alt={parent.person.name}
                  />
                </Link>
                <PersonNameDisplay person={parent.person} />
              </div>
            ))}
        </div>
      </div>

      {/* SIBLINGS */}
      <div
        className={`grid-item sibling-box ${
          siblings.length === 0 ? "empty" : ""
        }`}
      >
        <div className="person-grid">
          <div className="label">
            {siblings.length > 1 ? (
              <Button
                variant="text"
                onClick={handleSiblingPrev}
                style={{
                  height: "100%",
                  minWidth: "10px",
                  maxWidth: "10px",
                  color: "red.main",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: theme.palette.red.main,
                  },
                  "&:focus": {
                    backgroundColor: "transparent",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                  },
                }}
              >
                <ArrowForwardIosIcon
                  style={{
                    transform: "scale(0.9) rotate(180deg)",
                    color: theme.palette.red.main,
                  }}
                />
              </Button>
            ) : (
              ""
            )}
            Sibling
            {siblings.length > 1 ? "s" : ""}
            {siblings.length > 1 ? (
              <Button
                variant="text"
                onClick={handleSiblingPrev}
                style={{
                  height: "100%",
                  minWidth: "10px",
                  maxWidth: "10px",
                  color: "red.main",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: theme.palette.red.main,
                  },
                  "&:focus": {
                    backgroundColor: "transparent",
                    outline: "none",
                  },
                }}
              >
                <ArrowForwardIosIcon
                  style={{
                    transform: "scale(0.9)",
                    color: theme.palette.red.main,
                  }}
                />
              </Button>
            ) : (
              ""
            )}
          </div>
          {currentSibling && (
            <>
              <Link
                key={currentSibling.person.id}
                to={`/person/${currentSibling.person.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  key={currentSibling.person.id}
                  src={`${profilesrc}${currentSibling.person.picture}`}
                  alt={currentSibling.person.name}
                />
              </Link>
              <PersonNameDisplay person={currentSibling.person} />
            </>
          )}
        </div>
      </div>

      {/* MAIN PERSON */}
      <div className="grid-item main-person-box">
        {person !== null && (
          <div className="person-grid">
            <div className="label">Person</div>
            <img src={`${profilesrc}${person.picture}`} alt={person.name} />
            <PersonNameDisplay person={person} />
          </div>
        )}
      </div>

      {/* PARTNER */}
      <div
        className={`grid-item partner-box ${partner === null ? "empty" : ""}`}
      >
        <div className="person-grid">
          <div className="label">Partner</div>
          {partner !== null && (
            <>
              <Link
                key={partner.person.id}
                to={`/person/${partner.person.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  key={partner.person.id}
                  src={`${profilesrc}${partner.person.picture}`}
                  alt={partner.person.name}
                />
              </Link>
              <PersonNameDisplay person={partner.person} />
            </>
          )}
        </div>
      </div>

      {/* CHILDREN */}
      <div
        className={`grid-item children-box ${
          children.length === 0 ? "empty" : ""
        }`}
      >
        <div className="label">Children</div>
        <div className="people-flex">
          {children.length !== 0 &&
            children.map((child) => (
              <div className="people-grid" key={child.person.id}>
                <Link
                  key={child.person.id}
                  to={`/person/${child.person.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    key={child.person.id}
                    src={`${profilesrc}${child.person.picture}`}
                    alt={child.person.name}
                  />
                </Link>
                <PersonNameDisplay person={child.person} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PersonPage;
