import React, { useState, useEffect } from "react";
import "./PersonPage.css";
import { rootsrc, profilesrc } from "../../../utils/source.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PersonNameDisplay from "./PersonNameDisplay.jsx";
import { theme } from "../../../theme/theme.js";
import { jwtDecode } from "jwt-decode";

function PersonPage() {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [person, setPerson] = useState(null);
  const [relationships, setRelationships] = useState(null);
  const [currentSiblingIndex, setCurrentSiblingIndex] = useState(0);
  const [parents, setParents] = useState([]);
  const [siblings, setSiblings] = useState([]);
  const [children, setChildren] = useState([]);
  const [partner, setPartner] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUpdateTime, setImageUpdateTime] = useState(Date.now());

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

  //get user id
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedToken = jwtDecode(jwt);
      setUserId(parseInt(decodedToken.sub));
    }
  }, []);

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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type (only allow images)
    const validImageTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    if (!validImageTypes.includes(file.type)) {
      alert("Only JPEG, PNG, or GIF images are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", userId);

    setIsUploading(true);

    try {
      const response = await fetch(`${rootsrc}/people/update-picture`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedPerson = await response.json();
        console.log(updatedPerson);
        setPerson(updatedPerson);
        setImageUpdateTime(Date.now());
        window.location.reload();
      } else {
        console.error("Failed to upload image:", response.statusText);
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    } finally {
      setIsUploading(false);
    }
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
                <PlayArrowIcon
                  style={{
                    transform: "scale(0.9) rotate(180deg)",
                    color: theme.palette.orange.light,
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
                onClick={handleSiblingNext}
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
                <PlayArrowIcon
                  style={{
                    transform: "scale(0.9)",
                    color: theme.palette.orange.light,
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
            {parseInt(id) === userId ? (
              <label htmlFor="upload-input" className="upload-label">
                <img
                  src={`${profilesrc}${person.picture}?t=${imageUpdateTime}`}
                  alt={person.name}
                  className="profile-picture clickable"
                />
                {isUploading && <p>Uploading...</p>}
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            ) : (
              <img
                src={`${profilesrc}${person.picture}`}
                alt={person.name}
                className="profile-picture"
              />
            )}
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
