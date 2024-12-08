import React, { useState, useEffect } from "react";
import "./VideoPage.css";
import {
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams, useNavigate } from "react-router-dom";
import { rootsrc, thumbnailsrc, profilesrc } from "../../../utils/source";
import VideoForm from "./VideoForm.jsx";
import TVLink from "./TVLink/TVLink.jsx";
import { jwtDecode } from "jwt-decode";

function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [nextSuggestedVideo, setNextSuggestedVideo] = useState(null);
  const [videoPeople, setVideoPeople] = useState([]);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [refreshComments, setRefreshComments] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedToken = jwtDecode(jwt);
      setUserId(parseInt(decodedToken.sub));
    }
  }, []);

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
  }, [refreshComments]);

  //next suggested video
  useEffect(() => {
    if (video === null) return;
    if (video.next_suggested_video_id === null) return;

    fetch(`${rootsrc}/videos/${video.next_suggested_video_id}`)
      .then((response) => response.json())
      .then((data) => {
        setNextSuggestedVideo(data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [video]);

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
  }, [refreshComments]);

  //Comments
  useEffect(() => {
    fetch(`${rootsrc}/Comments/video/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error fetching videoPeople data:", error);
      });
  }, [refreshComments]);

  function onCommentSubmit(userComment) {
    let commentObject = {
      person_id: userId,
      video_id: video.id,
      comment_text: userComment,
    };
    fetch(`${rootsrc}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentObject),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserComment("");
        setRefreshComments((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error adding comment", error);
      });
  }

  const navigate = useNavigate();
  const handleNextVideoClick = () => {
    navigate(`/videos/${nextSuggestedVideo.id}`);
    window.location.reload();
  };
  return (
    <div className="video-page">
      <video
        src={`${rootsrc}/videos/video-src/${video.file_name}`}
        poster={`${rootsrc}/Videos/thumbnail-src/${video.thumbnail}`}
        controls
      />

      <Accordion
        sx={{
          width: "100%",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {video.title}
          {video.year != null && ` ~ ${video.year}`}
        </AccordionSummary>
        <AccordionDetails>
          <div className="video-metadata">
            {video.location && (
              <>
                {video.location}
                <br />
              </>
            )}
            {video.description && (
              <>
                {video.description}
                <br />
              </>
            )}
            {videoPeople.length > 0 && (
              <div className="icon-container-vid">
                {videoPeople.map((person) => (
                  <Tooltip title={person.first_name} key={person.id}>
                    <img
                      className="icon-vid"
                      src={`${profilesrc}${person.picture}`}
                      alt={person.first_name}
                    />
                  </Tooltip>
                ))}
              </div>
            )}
            {(video?.year ||
              (nextSuggestedVideo?.title && nextSuggestedVideo?.thumbnail)) && (
              <div className="suggestions">
                {video?.year && <TVLink year={video.year} />}
                {nextSuggestedVideo?.title && nextSuggestedVideo?.thumbnail && (
                  <div className="next-video-container">
                    <img
                      src={`${thumbnailsrc}${nextSuggestedVideo?.thumbnail}`}
                      className="next-video-thumbnail"
                      alt={nextSuggestedVideo?.title}
                      onClick={handleNextVideoClick}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="next-video-text">
                      Watch {nextSuggestedVideo?.title} next!
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          width: "100%",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Recognize Something?
        </AccordionSummary>
        <AccordionDetails>
          <VideoForm video={video} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="comments-accordion"
        sx={{
          width: "100%",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Comments
        </AccordionSummary>
        <AccordionDetails>
          <div className="comments-container">
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <Tooltip title={comment.person.first_name}>
                  <img
                    className="comment-icon"
                    src={`${profilesrc}${comment.person.picture}`}
                    alt={comment.person.first_name}
                  />
                </Tooltip>
                <span>{comment.comment_text}</span>
              </div>
            ))}
            <div className="add-comment-container">
              <TextField
                className="comment-textfield"
                label="Add a comment"
                variant="filled"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => onCommentSubmit(userComment)}
                disabled={!userComment}
                sx={{
                  width: "100%",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default VideoPage;
