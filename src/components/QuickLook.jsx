// components/QuickLook.jsx
import React, { useState, useRef, useEffect } from 'react';
import thumbnail1 from '../assets/thumbnails/thumnails 1.png';
import thumbnail2 from '../assets/thumbnails/thumnails 2.png';
import thumbnail3 from '../assets/thumbnails/thumnails 3.png';
import thumbnail4 from '../assets/thumbnails/thumnails 4.png';
import thumbnail5 from '../assets/thumbnails/thumnails 5.png';
import video1 from '../assets/videos/3creen girl.mov';
import video2 from '../assets/videos/firat video mahdi.mov';
import video3 from '../assets/videos/Timeline 1.mov';
import video4 from '../assets/videos/Timeline 2.mov';
import styles from '../styles/QuickLook.module.css';

const QuickLook = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showController, setShowController] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredVideo, setHoveredVideo] = useState(null);

    // Refs
    const mainVideoRef = useRef(null);
    const leftVideoRef = useRef(null);
    const rightVideoRef = useRef(null);
    const mobileVideoRefs = useRef([]);
    const containerRef = useRef(null);
    const sectionRef = useRef(null);
    const progressBarRef = useRef(null);
    const controllerTimeoutRef = useRef(null);

    const videos = [
        {
            id: 1,
            thumbnail: thumbnail1,
            video: video1,
            title: '3creen girl',
            description: 'Creative visual content',
            category: 'Creative'
        },
        {
            id: 2,
            thumbnail: thumbnail2,
            video: video2,
            title: 'Firat video mahdi',
            description: 'Professional video production',
            category: 'Professional'
        },
        {
            id: 3,
            thumbnail: thumbnail3,
            video: video3,
            title: 'Timeline 1',
            description: 'Timeline showcase',
            category: 'Showcase'
        },
        {
            id: 4,
            thumbnail: thumbnail4,
            video: video4,
            title: 'Timeline 2',
            description: 'Advanced timeline work',
            category: 'Advanced'
        }
    ];

    // Check if mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Intersection Observer for visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setIsPlaying(true);
                } else {
                    setIsVisible(false);
                    setIsPlaying(false);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Mouse move handler
    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    // Video event listeners
    useEffect(() => {
        const currentVideo = isMobile ? mobileVideoRefs.current[currentIndex] : mainVideoRef.current;

        if (currentVideo) {
            const handleTimeUpdate = () => {
                setCurrentTime(currentVideo.currentTime);
            };

            const handleLoadedMetadata = () => {
                setDuration(currentVideo.duration);
            };

            const handleVolumeChange = () => {
                setVolume(currentVideo.volume);
                setIsMuted(currentVideo.muted);
            };

            currentVideo.addEventListener('timeupdate', handleTimeUpdate);
            currentVideo.addEventListener('loadedmetadata', handleLoadedMetadata);
            currentVideo.addEventListener('volumechange', handleVolumeChange);

            return () => {
                currentVideo.removeEventListener('timeupdate', handleTimeUpdate);
                currentVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
                currentVideo.removeEventListener('volumechange', handleVolumeChange);
            };
        }
    }, [currentIndex, isMobile]);

    // Control video playback
    useEffect(() => {
        if (isMobile) {
            mobileVideoRefs.current.forEach((video, index) => {
                if (video) {
                    if (index === currentIndex && isPlaying && isVisible) {
                        video.play();
                    } else {
                        video.pause();
                    }
                }
            });
        } else {
            if (mainVideoRef.current) {
                if (isPlaying && isVisible) {
                    mainVideoRef.current.play();
                } else {
                    mainVideoRef.current.pause();
                }
            }
            if (leftVideoRef.current) leftVideoRef.current.pause();
            if (rightVideoRef.current) rightVideoRef.current.pause();
        }
    }, [currentIndex, isPlaying, isVisible, isMobile]);

    // Update main video source when currentIndex changes
    useEffect(() => {
        if (!isMobile && mainVideoRef.current) {
            mainVideoRef.current.src = videos[currentIndex].video;
            mainVideoRef.current.load();
            if (isPlaying && isVisible) {
                mainVideoRef.current.play();
            }
        }
    }, [currentIndex, isMobile]);

    // Auto-hide controller
    useEffect(() => {
        if (showController) {
            if (controllerTimeoutRef.current) {
                clearTimeout(controllerTimeoutRef.current);
            }
            controllerTimeoutRef.current = setTimeout(() => {
                setShowController(false);
            }, 3000);
        }

        return () => {
            if (controllerTimeoutRef.current) {
                clearTimeout(controllerTimeoutRef.current);
            }
        };
    }, [showController]);

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        setShowController(true);
    };

    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);

        const currentVideo = isMobile ? mobileVideoRefs.current[currentIndex] : mainVideoRef.current;
        if (currentVideo) {
            currentVideo.muted = newMutedState;
        }
        setShowController(true);
    };

    const handleProgressClick = (e) => {
        const currentVideo = isMobile ? mobileVideoRefs.current[currentIndex] : mainVideoRef.current;
        if (currentVideo && progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clickPosition = (e.clientX - rect.left) / rect.width;
            const newTime = clickPosition * duration;
            currentVideo.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);

        const currentVideo = isMobile ? mobileVideoRefs.current[currentIndex] : mainVideoRef.current;
        if (currentVideo) {
            currentVideo.volume = newVolume;
            currentVideo.muted = newVolume === 0;
        }
        setShowController(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const getSideVideoIndex = (offset) => {
        const index = currentIndex + offset;
        if (index < 0) return videos.length + index;
        if (index >= videos.length) return index - videos.length;
        return index;
    };

    const handleSideVideoClick = (index) => {
        setCurrentIndex(index);
    };

    const handleVideoClick = () => {
        setShowController(true);
    };

    const handleMouseEnter = () => {
        setShowController(true);
    };

    const handleMouseLeave = () => {
        setShowController(false);
    };

    return (
        <section
            ref={sectionRef}
            className={`${styles.quickLook} ${isVisible ? styles.visible : ''}`}
            onMouseMove={handleMouseMove}
        >
            {/* Dynamic background gradient */}
            <div className={styles.backgroundGradient}></div>

            {/* Animated cursor follower */}
            <div
                className={styles.cursorFollower}
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y
                }}
            ></div>

            <div ref={containerRef} className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <h2 className={styles.title}>Quick Look</h2>
                        <div className={styles.titleGlow}></div>
                    </div>
                    <p className={styles.subtitle}>
                        Explore my latest video creations and visual storytelling
                    </p>
                </div>

                {/* Desktop Layout */}
                {!isMobile && (
                    <div className={styles.desktopLayout}>
                        {/* Left Side Video */}
                        <div
                            className={`${styles.sideVideo} ${styles.leftVideo} ${hoveredVideo === 'left' ? styles.hovered : ''}`}
                            onMouseEnter={() => setHoveredVideo('left')}
                            onMouseLeave={() => setHoveredVideo(null)}
                            onClick={() => handleSideVideoClick(getSideVideoIndex(-1))}
                        >
                            <div className={styles.videoCard}>
                                <video
                                    ref={leftVideoRef}
                                    className={styles.sideVideoElement}
                                    loop
                                    muted
                                    playsInline
                                    poster={videos[getSideVideoIndex(-1)].thumbnail}
                                >
                                    <source src={videos[getSideVideoIndex(-1)].video} type="video/mp4" />
                                </video>
                                <div className={styles.videoOverlay}>
                                    <div className={styles.videoInfo}>
                                        <h4 className={styles.videoTitle}>{videos[getSideVideoIndex(-1)].title}</h4>
                                        <span className={styles.videoCategory}>{videos[getSideVideoIndex(-1)].category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.videoEffects}>
                                <div className={styles.shimmer}></div>
                                <div className={styles.glow}></div>
                            </div>
                        </div>

                        {/* Main Video */}
                        <div
                            className={`${styles.mainVideoContainer} ${hoveredVideo === 'main' ? styles.hovered : ''}`}
                            onMouseEnter={() => {
                                setHoveredVideo('main');
                                handleMouseEnter();
                            }}
                            onMouseLeave={() => {
                                setHoveredVideo(null);
                                handleMouseLeave();
                            }}
                            onClick={handleVideoClick}
                        >
                            <div className={styles.mainVideoCard}>
                                <video
                                    ref={mainVideoRef}
                                    className={styles.mainVideo}
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    poster={videos[currentIndex].thumbnail}
                                >
                                    <source src={videos[currentIndex].video} type="video/mp4" />
                                </video>

                                {/* Enhanced Video Controller */}
                                <div className={`${styles.videoController} ${showController ? styles.show : ''}`}>
                                    <div className={styles.progressContainer}>
                                        <div
                                            ref={progressBarRef}
                                            className={styles.progressBar}
                                            onClick={handleProgressClick}
                                        >
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.controlsRow}>
                                        <div className={styles.leftControls}>
                                            <button className={styles.controlBtn} onClick={togglePlayPause}>
                                                {isPlaying ? (
                                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
                                                    </svg>
                                                ) : (
                                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" fill="currentColor" />
                                                    </svg>
                                                )}
                                            </button>

                                            <button className={styles.controlBtn} onClick={toggleMute}>
                                                {isMuted || volume === 0 ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor" />
                                                    </svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor" />
                                                    </svg>
                                                )}
                                            </button>

                                            <div className={styles.volumeSlider}>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    value={volume}
                                                    onChange={handleVolumeChange}
                                                    className={styles.volumeInput}
                                                />
                                            </div>

                                            <div className={styles.timeDisplay}>
                                                <span>{formatTime(currentTime)}</span>
                                                <span>/</span>
                                                <span>{formatTime(duration)}</span>
                                            </div>
                                        </div>

                                        <div className={styles.rightControls}>
                                            <button className={styles.controlBtn} onClick={goToPrevious}>
                                                <svg width="18" height="18" viewBox="0 0 24 24">
                                                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor" />
                                                </svg>
                                            </button>

                                            <button className={styles.controlBtn} onClick={goToNext}>
                                                <svg width="18" height="18" viewBox="0 0 24 24">
                                                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" fill="currentColor" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Video Info */}
                                <div className={styles.mainVideoInfo}>
                                    <div className={styles.infoContent}>
                                        <h3 className={styles.mainVideoTitle}>{videos[currentIndex].title}</h3>
                                        <p className={styles.mainVideoDescription}>{videos[currentIndex].description}</p>
                                        <span className={styles.mainVideoCategory}>{videos[currentIndex].category}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.mainVideoEffects}>
                                <div className={styles.shimmer}></div>
                                <div className={styles.glow}></div>
                            </div>
                        </div>

                        {/* Right Side Video */}
                        <div
                            className={`${styles.sideVideo} ${styles.rightVideo} ${hoveredVideo === 'right' ? styles.hovered : ''}`}
                            onMouseEnter={() => setHoveredVideo('right')}
                            onMouseLeave={() => setHoveredVideo(null)}
                            onClick={() => handleSideVideoClick(getSideVideoIndex(1))}
                        >
                            <div className={styles.videoCard}>
                                <video
                                    ref={rightVideoRef}
                                    className={styles.sideVideoElement}
                                    loop
                                    muted
                                    playsInline
                                    poster={videos[getSideVideoIndex(1)].thumbnail}
                                >
                                    <source src={videos[getSideVideoIndex(1)].video} type="video/mp4" />
                                </video>
                                <div className={styles.videoOverlay}>
                                    <div className={styles.videoInfo}>
                                        <h4 className={styles.videoTitle}>{videos[getSideVideoIndex(1)].title}</h4>
                                        <span className={styles.videoCategory}>{videos[getSideVideoIndex(1)].category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.videoEffects}>
                                <div className={styles.shimmer}></div>
                                <div className={styles.glow}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Layout */}
                {isMobile && (
                    <div className={styles.mobileLayout}>
                        <div className={styles.mobileContainer}>
                            {videos.map((video, index) => (
                                <div
                                    key={video.id}
                                    className={`${styles.mobileVideoCard} ${index === currentIndex ? styles.active : ''}`}
                                    style={{
                                        '--index': index,
                                        '--delay': `${index * 0.1}s`
                                    }}
                                    onClick={() => setCurrentIndex(index)}
                                >
                                    <div className={styles.mobileVideoInner}>
                                        <video
                                            ref={el => mobileVideoRefs.current[index] = el}
                                            className={styles.mobileVideo}
                                            loop
                                            muted={isMuted}
                                            playsInline
                                            poster={video.thumbnail}
                                        >
                                            <source src={video.video} type="video/mp4" />
                                        </video>

                                        <div className={styles.mobileVideoOverlay}>
                                            <div className={styles.mobileVideoInfo}>
                                                <h4 className={styles.mobileVideoTitle}>{video.title}</h4>
                                                <span className={styles.mobileVideoCategory}>{video.category}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.mobileVideoEffects}>
                                        <div className={styles.shimmer}></div>
                                        <div className={styles.glow}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation and Stats */}
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{videos.length}</div>
                        <div className={styles.statLabel}>Videos</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{currentIndex + 1}</div>
                        <div className={styles.statLabel}>Current</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>HD</div>
                        <div className={styles.statLabel}>Quality</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickLook;
