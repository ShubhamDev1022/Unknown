import Home from './components/Home';
import { useState, useEffect } from 'react';
import image1 from '/precious.png';
// import image2 from '/2.jpg';
// import image3 from '/3.jpg';
// import video1 from '/v1.mp4';
// import video2 from '/v2.mp4';
// import video3 from '/v3.mp4';
// import video4 from '/v4.mp4';

function App() {
  const media = [
    { type: 'image', src: image1 },
    // { type: 'image', src: image2 },
    // { type: 'image', src: image3 },
    // { type: 'video', src: video1 },
    // { type: 'video', src: video2 },
    // { type: 'video', src: video3 },
    // { type: 'video', src: video4 },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [media.length]);

  const currentMedia = media[currentIndex];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        {currentMedia.type === 'video' ? (
          <video
            src={currentMedia.src}
            autoPlay
            loop
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={currentMedia.src}
            alt="Slideshow"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Home />
      </div>
    </div>
  );
}
export default App;
