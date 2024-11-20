import React, { useState } from "react";
import { rootsrc } from "../../../utils/source";
import "./PictureUploader.css";

function PictureUploader({ albumId, onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("uploader_id", "1");
    formData.append("album_id", albumId);

    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch(`${rootsrc}/pictures/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const newPictures = await response.json();
      onUploadSuccess();
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageUpload}
        className="upload-input"
        multiple
      />
      <label htmlFor="imageUpload" className="upload-button">
        {isUploading ? "Uploading..." : "Add Images"}
      </label>
    </div>
  );
}

export default PictureUploader;
