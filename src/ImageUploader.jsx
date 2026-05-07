import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setMessage("");
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreview(null);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch("https://api.capturely.co.uk/images", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setMessage("✅ Sent to Emile successfully");
      setImage(null);
      setPreview(null);
    } catch (err) {
      setMessage("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <h1>Image Upload</h1>

      <div className="card">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && (
          <>
            <div className="image-container">
              <img src={preview} alt="Preview" />
            </div>

            <button
              className="arsenal-button"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Sending..." : "Send to Emile"}
            </button>

            <button
              className="arsenal-button"
              onClick={handleRemove}
              disabled={uploading}
            >
              Remove
            </button>
          </>
        )}

        {message && <p className="error">{message}</p>}
      </div>
    </div>
  );
};

export default ImageUploader;