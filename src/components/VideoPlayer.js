import React, { Component, createRef } from "react";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.container = createRef();
    this.state = {
      videoObject: null,
    };
  }

  componentDidMount() {
    if (window.VdoPlayer) {
      return this.loadPlayer();
    }
    const playerScript = document.createElement("script");
    playerScript.src =
      "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js";
    document.body.appendChild(playerScript);
    playerScript.addEventListener("load", () => {
      return this.loadPlayer();
    });
  }

  loadPlayer() {
    window.playerContainer = this.container.current;
    new window.VdoPlayer({
      otp: this.props.otp,
      playbackInfo: this.props.playbackInfo,
      theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
      container: this.container.current,
    });
  }

  render() {
    return <div className="player" ref={this.container}></div>;
  }
}

export default VideoPlayer;
