import { useState, useEffect } from "react";
import "../App.css";
import confetti from "canvas-confetti";

const Home = () => {
  const [showNote, setShowNote] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNote(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

 

  const handleYesClick = () => {
    showHeartsAnimation();
    launchFireworks();
  };

  const handleNoClick = () => {
    if (noClickCount < 2) {
      setNoClickCount(noClickCount + 1);
    } else {
      setShowFinalMessage(true);
      setShowButtons(false);
    }
  };

  const showHeartsAnimation = () => {
    for (let i = 0; i < 100; i++) {
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 100 + "%";
      heart.style.fontSize = Math.floor(Math.random() * 30 + 10) + "px";
      heart.style.opacity = "1";
      heart.style.transition = "transform 5s linear, opacity 5s linear";
      document.body.appendChild(heart);

      const randomX = (Math.random() - 0.5) * 2000;
      const randomY = (Math.random() - 0.5) * 2000;
      requestAnimationFrame(() => {
        heart.style.transform = `translate(${randomX}px, ${randomY}px)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => {
        document.body.removeChild(heart);
      }, 5000);
    }
  };

  const launchFireworks = () => {
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 } });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="w-screen h-screen flex items-center flex-col justify-center bg-transparent relative overflow-hidden">
      {showNote && (
        <div className="absolute top-2 bg-gray-800 text-white p-2 rounded">
          Photos are for reference only. No misuse intended.
        </div>
      )}
        <div className="absolute top-23 right-5 font-bold" >
        "Green flag? You're a whole forest!"
        </div>
      { !showSecondMessage && (
        <>
        {!isOpen && (
          <div className="absolute top-50 right-40 bg-gray-800 text-white p-2 rounded cursor-pointer">
            Click me!
            <span>
            <i className="ri-arrow-down-line text-2xl"></i>
            </span>
          </div>
        )}
        <div
          className="relative w-64 h-40 perspective-1000 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`absolute w-full h-1/2 bg-red-400 transform origin-top transition-transform duration-700 ${
              isOpen ? "rotate-x-180" : "rotate-x-0"
            }`}
          />
          <div className="absolute bottom-0 w-full h-1/2 bg-red-400" />
          {isOpen && (
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md shadow-lg">
              <h2 className="text-center text-black font-medium text-md">
                "Hey there! You don’t know me yet, but I admire you from afar.
                This is my little effort to introduce myself and hopefully,
                become friends."
              </h2>
            </div>
          )}
        </div>
          </>
      )}

      {!showSecondMessage && (
        <i
          className="ri-arrow-right-line mt-5 border p-5 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg text-2xl cursor-pointer"
          onClick={() => setShowSecondMessage(true)}
        ></i>
      )}

      {showSecondMessage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center font-medium text-xl p-4 bg-white/20 backdrop-blur-md shadow-lg">
          <h2 className="text-center text-black mb-4">
            "I know we’ve never spoken, but I couldn’t let this feeling stay
            just in my heart. From the moment I came across you, there was
            something about you—your smile, your aura, the way you seem to light
            up the world around you. I don’t know if words can do justice to
            what I feel, but I wanted to take this little step to let you know
            that you’re special, even to someone you’ve never met. I’d love the
            chance to know you, to share smiles, conversations, and maybe, one
            day, a story of our own. Until then, this is me, hoping you’ll take
            a small step towards me too." ❤️
          </h2>
          {!showButtons && (
            <i
              className="ri-arrow-right-line mt-5 border p-5 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg text-2xl cursor-pointer"
              onClick={() => setShowButtons(true)}
            ></i>
          )}
          {showButtons && (
            <div className="flex flex-col gap-1">
              <button
                className="bg-green-500 text-white rounded"
                onClick={handleYesClick}
              >
                Yes, let's be friends
              </button>
              <button
                className="bg-red-500 text-white rounded"
                onClick={handleNoClick}
                style={{
                  position: noClickCount > 0 ? "absolute" : "relative",
                  top:
                    noClickCount === 1
                      ? "20%"
                      : noClickCount === 2
                      ? "50%"
                      : "auto",
                  left:
                    noClickCount === 1
                      ? "30%"
                      : noClickCount === 2
                      ? "70%"
                      : "auto",
                }}
              >
                No, never contact me
              </button>
            </div>
          )}
          {showFinalMessage && (
            <h2 className="text-center text-black mt-4">
              I respect your decision, sorry.
            </h2>
          )}
        </div>
      )}
      <div className="absolute bottom-0">Made by- A Web Developer</div>
    </div>
  );
};

export default Home;
