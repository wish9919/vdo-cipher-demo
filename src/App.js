import React from "react";
import Header from "./components/Header";
import VideosList from "./components/VideosList";

function App() {
  return (
    <div>
      <Header />
      <div
        id="embedBox"
        style={{ width: 1280, maxWidth: "100%", height: "auto" }}
      ></div>

      <VideosList />
    </div>
  );
}

export default App;
