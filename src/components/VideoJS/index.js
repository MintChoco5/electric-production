import React from 'react';
import videojs from 'video.js';
// 记得引用css文件！
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
  // video标签的引用Hook
  const videoRef = React.useRef(null);
  // 播放器实例的引用Hook
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  React.useEffect(() => {
	  // 确保video.js的播放器实例player仅被初始化一次，否则会报错
	  if (!playerRef.current) {
	      const videoElement = videoRef.current;
	      if (!videoElement) {
	          return;
	      }
	
	      const player = playerRef.current = videojs(videoElement, options, () => {
	          videojs.log('播放器准备就绪！');
	          onReady && onReady(player);
	      });
	  // 当props发生变化时，可以对已经存在的player实例作一些操作，如：
	  } else {
	     // const player = playerRef.current;
	     // player.autoplay(options.autoplay);
	     // player.src(options.sources);
	  }
  }, [options, videoRef]);

  // 控件被unmount卸载的时候，记得要对player实例执行反初始化dispose
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className='video-js vjs-big-play-centered'/>
    </div>
  );
}

export default VideoJS;
