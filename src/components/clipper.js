import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './clipper.css';

const Clipper = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Use navigate at the top level of the component
  const API_KEY = 'AIzaSyBYeLGg3D078oithd229TQw8MZIcgXnalY';

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleGenerateClick = () => {
    // Navigate to '/home' when Generate button is clicked
    navigate('/home');
  };

  const fetchVideoData = async () => {
    setError('');
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`
      );
      const data = await response.json();

      if (data.items.length > 0) {
        setVideoData(data.items[0].snippet);
      } else {
        setError('Video not found. Please check the URL.');
      }
    } catch (error) {
      setError('Error fetching video data.');
      console.error(error);
    }
  };

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">Channel-<span className="highlight">IQ</span></div>
        <div className="nav-links">
          <a href="#">Clipper</a>
          <a href="#">SEO</a>
          <a href="#">Thumbnail</a>
          <a href="#">Pricing</a>
          <button className="sign-in-btn">Sign In</button>
          <button className="sign-up-btn">Sign Up</button>
        </div>
      </nav>

      <div className="url-input-container">
        <input
          type="url"
          value={videoUrl}
          onChange={handleInputChange}
          placeholder="https://www.youtube.com/watch?v=..."
          className="url-input"
        />
        <button className="remove-btn" onClick={() => setVideoUrl('')}>Remove</button>
        <button className="fetch-btn" onClick={fetchVideoData}>Fetch Video</button>
      </div>

      <main className="main-content">
        {error && <p className="error-message">{error}</p>}

        {videoData && (
          <>
            <div className="video-preview-container">
              <img src={videoData.thumbnails.high.url} alt="Video Thumbnail" className="video-thumbnail" />
            </div>
            
            <div className="generate-btn">
              <button onClick={handleGenerateClick}>Generate</button>
            </div>

            <div className="settings-container">
              <label>Choose Optimization type:</label>
              <div className="optimization features">
                <button>Long Form</button>
                <button>Short Form</button>
              </div>

              <label>Clip Length</label>
              <select>
                <option>90s</option>
                <option>60s</option>
                <option>30s</option>
              </select>

              <p>Choose one or more features to apply:</p>
              <div className="features">
                <button>Noise Reduction</button>
                <button>Video Quality</button>
                <button>Captions</button>
              </div>

              <label>Number of Clips</label>
              <div className="clip-count">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
              </div>

              <label>Choose aspect ratio</label>
              <select>
                <option>9:16</option>
                <option>16:9</option>
                <option>4:3</option>
              </select>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Clipper;

