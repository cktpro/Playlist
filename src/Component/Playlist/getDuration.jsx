import React, { memo, useEffect, useRef, useState } from "react";
import { getDuration } from "../../helper/index";
function GetDuration(props) {
  const { src } = props;
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
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  return <div>
    <audio
          className="d-none"
          src={src}
          id="audio"
          ref={audioRef}
        />
        {getDuration(duration)}
  </div>;
}

export default memo(GetDuration);
