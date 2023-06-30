import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { getDuration } from "../../helper/index";
// import audio from 'assets/music/coaycuaanhay.mp3';
// import thumbnail from 'assets/image/music/1.jpg';

import "./music.css";

// const audio = require('assets/music/coaycuaanhay.mp3');

function MusicPlay(props) {
  const { name, artist, cover, id, src, onNext, onPrevious, onRandom } = props;

  const audioRef = useRef();
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(1);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (document.readyState === "interactive") {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audioRef.current.play();
    }

    //   audioRef.current.play();
    // }

    // setTimeout(() => {
    //   audioRef.current.play();
    //   setIsPlaying(true);
    // }, 1000);
  }, [id]);
  // useEffect(() => {
  //   setIsPlaying(false);
  // }, []);
  const onReplay = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };
  const onEnded = () => {
    switch (isRepeat) {
      case 1:
        return onNext();
      case 2:
        return onReplay();
      case 3:
        return onRandom();
      default:
        return onNext();
    }

    // if (isRepeat === 1) {
    //
    // }
    // if (isRepeat === 2) {
    //
    // }
    // if (isRepeat === 3) {
    //   onRandom();
    // }
  };

  const onChangeSlider = useCallback((event) => {
    // setTimer(event.target.value);
    audioRef.current.currentTime = event.target.value;
  }, []);

  useEffect(() => {
    function getTrackLength() {
      audioRef.current.addEventListener("loadedmetadata", function () {
        setDuration(audioRef.current.duration);
      });
    }

    getTrackLength();

    // if (audioRef.current) {
    //   getTrackLength(audioRef.current);
    // }
  }, []);

  const onUpdateTimer = useCallback(() => {
    setTimer(audioRef.current.currentTime);
  }, []);

  const onTogglePlayMusic = useCallback(
    (event) => {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the song if it is playing
      } else {
        audioRef.current.play(); // Play the song if it is paused
      }

      setIsPlaying((prevState) => !prevState);
    },
    [isPlaying]
  );
  const onToggleRepeat = () => {
    if (isRepeat >= 3) {
      setIsRepeat(1);
    } else {
      setIsRepeat(isRepeat + 1);
    }
  };
  return (
    <div className="musicSpace">
      <div className="music-player">
        <div
          className={`disk ${isPlaying ? "play" : ""}`}
          style={{
            backgroundImage: `url(${cover})`,
          }}
        />
        <h4 className="music-name">{name}</h4>

        <p className="artist-name">{artist}</p>

        <div className="song-slider">
          <input
            type="range"
            // min="1"
            max={duration}
            value={timer}
            className="slider"
            id="myRange"
            onInput={onChangeSlider}
          />
          <span className="current-time">{getDuration(timer)}</span>
          <span className="song-duration">{getDuration(duration)}</span>
        </div>

        <div className="controls">
          {/* <button className="btn forward-btn">
        <i className={"fa-solid fa-rotate-left"}></i><i class="fa-solid fa-shuffle"></i>
          </button> */}
          {/* <i class=""></i> */}
          <button className="btn forward-btn" onClick={onToggleRepeat}>
            <i
              className={`${
                isRepeat === 1
                  ? "fa-solid fa-repeat"
                  : isRepeat === 2
                  ? "fa-solid fa-rotate-left"
                  : "fa-solid fa-shuffle"
              }`}
            ></i>
          </button>
          <button
            className="btn backward-btn"
            onClick={isRepeat === 3 ? onRandom : onPrevious}
          >
            <i className="fa-solid fa-backward"></i>
          </button>
          <button className="play-btn pause" onClick={onTogglePlayMusic}>
            {isPlaying ? (
              <i className="fa-solid fa-pause fa-2xl"></i>
            ) : (
              <i className="fa-solid fa-play fa-2xl"></i>
            )}
          </button>
          <button
            className="btn forward-btn"
            onClick={isRepeat === 3 ? onRandom : onNext}
          >
            <i className="fa-sharp fa-solid fa-forward"></i>
          </button>
          <button className="btn forward-btn" onClick={onReplay}>
            <i className="fa-solid fa-square"></i>
          </button>
        </div>

        <audio
          className="d-none"
          src={src}
          id="audio"
          ref={audioRef}
          onTimeUpdate={onUpdateTimer}
          onEnded={onEnded}
        />
      </div>
    </div>
  );
}

export default memo(MusicPlay);
