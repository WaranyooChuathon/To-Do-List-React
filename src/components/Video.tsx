import { useRef, useEffect } from "react";

type VideoPlayerProps = {
  src: string;
  isPlaying: boolean;
};

export default function VideoPlayer({ src, isPlaying }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}
