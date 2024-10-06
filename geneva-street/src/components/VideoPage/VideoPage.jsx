import React, { useState, useEffect } from "react";
import "./VideoPage.css";
import { Tooltip, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { rootsrc } from "../../utils/source";
import VideoForm from "./VideoForm.jsx";

function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [videoPeople, setVideoPeople] = useState([]);

  //video
  useEffect(() => {
    fetch(`${rootsrc}/videos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVideo(data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, []);

  //people video
  useEffect(() => {
    fetch(`${rootsrc}/pv/video/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVideoPeople(data);
      })
      .catch((error) => {
        console.error("Error fetching videoPeople data:", error);
      });
  }, []);

  //-------------------------------------------

  const [tabValue, setTabValue] = useState(0);

  return (
    <div className="video-page">
      <div className="left-side">
        <video
          src={`${rootsrc}/videos/video-src/${video.file_name}`}
          poster={`${rootsrc}/Videos/thumbnail-src/${video.thumbnail}`}
          controls
        />
        <div className="icon-container">
          {videoPeople.length > 0 &&
            videoPeople.map((person) => (
              <Tooltip title={person.first_name} key={person.id}>
                <img
                  className="icon"
                  src={`${rootsrc}/People/pokemon-src/${person.picture}`}
                  alt={person.first_name}
                />
              </Tooltip>
            ))}
        </div>
      </div>

      <div className="right-side">
        <div className={"video-metadata"}>
          <span className="video-title">{video.title}</span>
          {video.location && (
            <span className="video-location">{video.location}</span>
          )}
          {video.year && <span className="video-year">{video.year}</span>}
          {video.description && (
            <span className="video-description">{video.description}</span>
          )}
        </div>

        <div className="tabs">
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
          >
            <Tab label="Comments" />
            <Tab label="Recognize something?" />
          </Tabs>
          <div className="comments-container" hidden={tabValue !== 0}>
            Comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
            <br />
            comments
          </div>
          <div className="form-container" hidden={tabValue !== 1}>
            <VideoForm video={video} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
