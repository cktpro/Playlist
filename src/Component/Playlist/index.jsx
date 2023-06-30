import React, { memo, useCallback, useEffect, useState } from "react";
import "./playList.css";
import MusicPlay from "./musicPlay";
import GetDuration from "./getDuration";

const allList = [
  {
    id: 1,
    name: "Bông Hoa Đẹo Nhất",
    cover:
      "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/f/8/1/e/f81efd92fa9a3d52eb37f3b867ab9d32.jpg",
    src: require("../../assets/audio/PhanBoiChinhMinh-QuanAPVuongAnhTu-7198436.mp3"),
    artist: "Quân AP ft Vương Anh Tú",
    isLiked: false,
  },
  {
    id: 2,
    name: "Có Thể Được Không",
    cover:
      "https://avatar-ex-swe.nixcdn.com/song/2019/06/10/3/5/a/4/1560155881037_640.jpg",
    src: require("../../assets/audio/CoTheDuocKhong-TruongYHaoZhangZiHao-5599170 .mp3"),
    artist: "Trương Y Hạo",
    isLiked: false,
  },
  {
    id: 3,
    name: "Gene",
    cover: "https://img.saostar.vn/2019/05/13/5177543/batch_geneartwork.jpg",
    src: require("../../assets/audio/Gene-BinzTouliver-5961947.mp3"),
    artist: "Binz ft Touliver",
    isLiked: true,
  },
  {
    id: 4,
    name: "Hãy Trao Cho Anh",
    cover:
      "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/7/1/741911/Hay-Trao-Cho-Anh.jpg",
    src: require("../../assets/audio/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3"),
    artist: "Sơn Tùng MTP",
    isLiked: true,
  },
  {
    id: 5,
    name: "Kẻ Cắp Gặp Bà Già",
    cover:
      "https://nld.mediacdn.vn/2020/4/5/dwmhi3gi-1586048315907697508551.jpeg",
    src: require("../../assets/audio/DiamondCutDiamond-HoangThuyLinhBINZ-6153594.mp3"),
    artist: "Hoàng Thùy Linh ft Binz",
    isLiked: false,
  },
  {
    id: 6,
    name: "Người Lạ Ơi",
    cover:
      "https://photo-zmp3.zmdcdn.me/thumb_video/4/d/4d8fe94c607efdef1f0f7a348fd83d7a_1515380849.png",
    src: require("../../assets/audio/NguoiLaOi-KarikOrangeSuperBrothers-5350989.mp3"),
    artist: "Karik ft Orange",
    isLiked: true,
  },
  {
    id: 7,
    name: "Lost Control",
    cover:
      "https://i1.sndcdn.com/artworks-000584613488-yut3wg-t500x500.jpg",
    src: require("../../assets/audio/Lost-Control-Alan-Walker-Nhac-Hot-Tiktok.mp3"),
    artist: "Alan Walker",
    isLiked: true,
  },
];

function PlayList(props) {
  const [selectedMusic, setSelectedMusic] = useState(allList[0]);
  const [playList, setPlayList] = useState();

  useEffect(() => {
    setPlayList(allList);
  }, [selectedMusic.id]);

  const onHandleSelectedMusic = useCallback(
    (id) => () => {
      const selected = playList.find((m) => m.id === id);

      setSelectedMusic(selected);
    },
    [playList]
  );
  const onNext = () => {
    let index = selectedMusic.id;
    if (index >= playList.length) {
      index = 1;
    } else {
      index += 1;
    }
    const idNext = playList.find((m) => m.id === index);
    setSelectedMusic(idNext);
  };
  const onPrevious = () => {
    let index = selectedMusic.id;
    if (index <= 1) {
      index = playList.length;
    } else {
      index -= 1;
    }
    const idNext = playList.find((m) => m.id === index);
    setSelectedMusic(idNext);
  };
  const randomPlay = () => {
    var min = 1;
    var max = playList.length;
    var rand = Math.floor(min + Math.random() * (max - min));
    const selected = playList.find((m) => m.id === rand);
    setSelectedMusic(selected);
  };
  const onChangeLike = (isLike) => {
    
  };
  return (
    <div className="music-space container mt-5">
      <div className="music-list">
        <div className="list-title text-strong">Most Popular</div>

        <div className="list-sub">{allList.length} songs</div>

        <div className="play-list">
          {playList?.length > 0 ? (
            playList.map((m) => (
              <div className="play-item" key={m.name}>
                <button
                  className="play-block"
                  onClick={
                    selectedMusic?.id === m.id
                      ? null
                      : onHandleSelectedMusic(m.id)
                  }
                >
                  <span className="index text-strong">{m.id}</span>

                  <img src={m.cover} alt="My Stress" className="thumbnail" />

                  {selectedMusic?.id === m.id ? (
                    <i className="fa-solid fa-volume-high play-icon playing"></i>
                  ) : (
                    <i className="fa-solid fa-play play-icon"></i>
                  )}

                  <span className="music-name text-strong">{m.name}</span>
                </button>

                <span className="play-author">{m.artist}</span>

                <span className="timer">
                  <GetDuration src={m.src} />
                </span>

                <button className="btn-like" onClick={onChangeLike(m.isLiked)}>
                  <i
                    className={` ${
                      m.isLiked ? "fa-solid fa-heart " : "fa-regular fa-heart"
                    }`}
                  ></i>
                </button>
              </div>
            ))
          ) : (
            <p>Không có bài hát trong danh sách</p>
          )}
        </div>
      </div>

      <div className="music-playing">
        <h4>Now Playing</h4>
        <MusicPlay
          name={selectedMusic.name}
          artist={selectedMusic.artist}
          cover={selectedMusic.cover}
          id={selectedMusic.id}
          src={selectedMusic.src}
          onNext={onNext}
          onPrevious={onPrevious}
          onRandom={randomPlay}
        />
      </div>
    </div>
  );
}
export default memo(PlayList);
