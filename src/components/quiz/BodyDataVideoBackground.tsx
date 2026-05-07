"use client";

export default function BodyDataVideoBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <video
        className="h-full w-full object-cover opacity-85"
        src="/videos/body-data-bg.mp4"
        poster="/images/body-data-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        {...{
          "webkit-playsinline": "true",
          "x5-playsinline": "true",
          "x5-video-player-type": "h5",
          "x5-video-player-fullscreen": "false",
        }}
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
    </div>
  );
}
