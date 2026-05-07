import { useState } from "react";

const ApiButton = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch("https://api.capturely.co.uk/images");

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setImageUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <button className="arsenal-button" onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Show Image"}
      </button>

      {error && <p className="error">{error}</p>}

      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="API result" />
        </div>
      )}
    </div>
  );
};

export default ApiButton;