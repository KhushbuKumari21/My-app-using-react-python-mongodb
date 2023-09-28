import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [overlaySettings, setOverlaySettings] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    content: "",
    positionX: 0,
    positionY: 0,
    size: 100,
  });

  useEffect(() => {
    // Fetch overlay settings from the Flask backend
    axios.get("http://localhost:8080/api/overlay_settings")
      .then((response) => {
        setOverlaySettings(response.data);
      })
      .catch((error) => {
        console.error("Axios error in useEffect:", error);
      });
  }, []);

  const addOverlay = () => {
    // Send a POST request to add a new overlay
    axios.post("http://localhost:8080/api/overlay_settings", newOverlay)
      
      .then(() => {
        // Fetch updated overlay settings
        axios.get("http://localhost:8080/api/overlay_settings")
          .then((response) => {
            setOverlaySettings(response.data);
          })
          .catch((error) => {
            console.error("Axios error in addOverlay (GET request):", error);
          });
      })
      .catch((error) => {
        console.error("Axios error in addOverlay (POST request):", error);
      });
  };

  return (
    <div className="App">
      <h1>RTSP Video Streaming with Overlays</h1>
      {/* Video Player */}
      <video controls>
        <source src="YOUR_RTSP_STREAM_URL_HERE" type="application/x-rtsp" />
      </video>

      {/* Overlay Settings */}
      <div className="overlay-form">
        <h2>Add Overlay</h2>
        <input
          type="text"
          placeholder="Overlay Content"
          value={newOverlay.content}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, content: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Position X"
          value={newOverlay.positionX}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, positionX: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Position Y"
          value={newOverlay.positionY}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, positionY: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Overlay Size"
          value={newOverlay.size}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, size: e.target.value })
          }
        />
        <button onClick={addOverlay}>Add</button>
      </div>

      {/* Display Overlay Settings */}
      <div className="overlay-list">
        <h2>Overlay Settings</h2>
        <ul>
          {overlaySettings.map((overlay, index) => (
            <li key={index}>
              Content: {overlay.content}, X: {overlay.positionX}, Y:{" "}
              {overlay.positionY}, Size: {overlay.size}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
