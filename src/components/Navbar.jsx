import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { useWindowScroll } from 'react-use';

const navItems = ["About", "Contact" , "Music->"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const navContainerRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const { y: currenScrollY } = useWindowScroll();

  useEffect(() => {
    if (currenScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav');
    } else if (currenScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add('floating-nav');
    } else if (currenScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add('floating-nav');
    }

    setLastScrollY(currenScrollY);
  }, [currenScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const audioElementRef = useRef(null);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play().catch((err) =>
        console.error("Failed to play audio:", err)
      );
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Only play the audio after a user interaction (e.g., clicking the audio button)
  const startAudioAfterInteraction = () => {
    if (!isAudioPlaying) {
      setIsAudioPlaying(true);
      setIsIndicatorActive(true);
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 h-16 border-none transition-all duration-700 sm:inset-x-5 z-50 max-sm:w-[92%] max-sm:ml-1 "
    >
      <header className="absolute top-1/2 w-full  -translate-y-1/2">
      
        <nav className="flex  items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img
              src="/img/logo.png"
              alt="Logo"
              className="w-10"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                toggleAudioIndicator();
                startAudioAfterInteraction(); // Trigger audio on user interaction
              }}
              className="ml-10 flex items-center space-x-0.5 text-white"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? 'active' : ''
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
