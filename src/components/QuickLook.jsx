// components/QuickLook.jsx
import React, { useState, useRef, useEffect } from 'react';
import ettrotThumbnail from '../assets/thumbnails/Ettrot Promotional video.png';
import fritaThumbnail from '../assets/thumbnails/Frita Fast Food.png';
import jciThumbnail from '../assets/thumbnails/JCI EVENT.png';
import kapariThumbnail from '../assets/thumbnails/Kapari square.png';
import pmentoThumbnail from '../assets/thumbnails/Pmentos presntation.png';
import ettrotVideo from '../assets/videos/Ettrot Promotional video.mov';
import fritaVideo from '../assets/videos/Frita Fast Food.mp4';
import jciVideo from '../assets/videos/JCI EVENT.mp4';
import kapariVideo from '../assets/videos/Kapari square.mp4';
import pmentoVideo from '../assets/videos/Pmentos presntation.mp4';
import styles from '../styles/QuickLook.module.css';

const QuickLook = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [showController, setShowController] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

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
            thumbnail: ettrotThumbnail,
            video: ettrotVideo,
            title: 'Ettrot Promotional',
            description: 'Professional promotional content',
            category: 'Promotional'
        },
        {
            id: 2,
            thumbnail: fritaThumbnail,
            video: fritaVideo,
            title: 'Frita Fast Food',
            description: 'Restaurant promotional video',
            category: 'Commercial'
        },
        {
            id: 3,
            thumbnail: jciThumbnail,
            video: jciVideo,
            title: 'JCI Event',
            description: 'Corporate event coverage',
            category: 'Event'
        },
        {
            id: 4,
            thumbnail: kapariThumbnail,
            video: kapariVideo,
            title: 'Kapari Square',
            description: 'Real estate showcase',
            category: 'Real Estate'
        },
        {
            id: 5,
            thumbnail: pmentoThumbnail,
            video: pmentoVideo,
            title: 'Pmento Presentation',
            description: 'Business presentation video',
            category: 'Business'
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

            const handleCanPlay = () => {
                console.log('Video can play');
            };

            const handleError = (e) => {
                console.error('Video error:', e);
            };

            currentVideo.addEventListener('timeupdate', handleTimeUpdate);
            currentVideo.addEventListener('loadedmetadata', handleLoadedMetadata);
            currentVideo.addEventListener('volumechange', handleVolumeChange);
            currentVideo.addEventListener('canplay', handleCanPlay);
            currentVideo.addEventListener('error', handleError);

            return () => {
                currentVideo.removeEventListener('timeupdate', handleTimeUpdate);
                currentVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
                currentVideo.removeEventListener('volumechange', handleVolumeChange);
                currentVideo.removeEventListener('canplay', handleCanPlay);
                currentVideo.removeEventListener('error', handleError);
            };
        }
    }, [currentIndex, isMobile]);

    // Control video playback
    useEffect(() => {
        if (isMobile) {
            mobileVideoRefs.current.forEach((video, index) => {
                if (video) {
                    if (index === currentIndex && isPlaying && isVisible) {
                        video.play().catch(console.error);
                    } else {
                        video.pause();
                    }
                }
            });
        } else {
            if (mainVideoRef.current) {
                if (isPlaying && isVisible) {
                    mainVideoRef.current.play().catch(console.error);
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
                mainVideoRef.current.play().catch(console.error);
            }
        }
    }, [currentIndex, isMobile, isPlaying, isVisible]);

    // Auto-hide controller
    useEffect(() => {
        if (showController) {
            if (controllerTimeoutRef.current) {
                clearTimeout(controllerTimeoutRef.current);
            }
            controllerTimeoutRef.current = setTimeout(() => {
                setShowController(false);
            }, 4000);
        }

        return () => {
            if (controllerTimeoutRef.current) {
                clearTimeout(controllerTimeoutRef.current);
            }
        };
    }, [showController]);

    // Enhanced navigation functions
    const goToPrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setShowController(true);
        const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 800);
    };

    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setShowController(true);
        const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 800);
    };

    // Mobile scroll functions
    const scrollToPrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const scrollToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 500);
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
        setShowController(true);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);

        const currentVideo = isMobile ? mobileVideoRefs.current[currentIndex] : mainVideoRef.current;
        if (currentVideo) {
            currentVideo.volume = newVolume;
            currentVideo.muted = newVolume === 0;
            setIsMuted(newVolume === 0);
        }
        setShowController(true);
    };

    const toggleFullscreen = () => {
        const currentVideo = isMobile ? mobileVideoRefs.current[currentIndex] : mainVideoRef.current;
        if (currentVideo) {
            if (!isFullscreen) {
                if (currentVideo.requestFullscreen) {
                    currentVideo.requestFullscreen();
                } else if (currentVideo.webkitRequestFullscreen) {
                    currentVideo.webkitRequestFullscreen();
                } else if (currentVideo.msRequestFullscreen) {
                    currentVideo.msRequestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                setIsFullscreen(false);
            }
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
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setShowController(true);
        setTimeout(() => setIsTransitioning(false), 800);
    };

    const handleVideoClick = () => {
        setShowController(true);
    };

    const handleMouseEnter = () => {
        setShowController(true);
    };

    const handleMouseLeave = () => {
        if (!isPlaying) {
            setShowController(false);
        }
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

                {/* Enhanced Desktop Layout with 3D Effect */}
                {!isMobile && (
                    <div className={styles.desktopLayout}>
                        {/* Left Navigation Arrow */}
                        <button
                            className={`${styles.navArrow} ${styles.leftArrow}`}
                            onClick={goToPrevious}
                            disabled={isTransitioning}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>

                        <div className={styles.videosContainer}>
                            {/* Left Side Video */}
                            <div
                                className={`${styles.sideVideo} ${styles.leftVideo} ${hoveredVideo === 'left' ? styles.hovered : ''} ${isTransitioning ? styles.transitioning : ''}`}
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
                                        preload="metadata"
                                    >
                                        <source src={videos[getSideVideoIndex(-1)].video} type="video/mp4" />
                                        <source src={videos[getSideVideoIndex(-1)].video} type="video/quicktime" />
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
                                className={`${styles.mainVideoContainer} ${hoveredVideo === 'main' ? styles.hovered : ''} ${isTransitioning ? styles.transitioning : ''}`}
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
                                        preload="metadata"
                                    >
                                        <source src={videos[currentIndex].video} type="video/mp4" />
                                        <source src={videos[currentIndex].video} type="video/quicktime" />
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
                                                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z" fill="currentColor" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="18" height="18" viewBox="0 0 24 24">
                                                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor" />
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

                                                <button className={styles.controlBtn} onClick={toggleFullscreen}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Video Info in Controller */}
                                        <div className={styles.videoInfoInController}>
                                            <h3 className={styles.currentVideoTitle}>{videos[currentIndex].title}</h3>
                                            <span className={styles.currentVideoCategory}>{videos[currentIndex].category}</span>
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
                                className={`${styles.sideVideo} ${styles.rightVideo} ${hoveredVideo === 'right' ? styles.hovered : ''} ${isTransitioning ? styles.transitioning : ''}`}
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
                                        preload="metadata"
                                    >
                                        <source src={videos[getSideVideoIndex(1)].video} type="video/mp4" />
                                        <source src={videos[getSideVideoIndex(1)].video} type="video/quicktime" />
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

                        {/* Right Navigation Arrow */}
                        <button
                            className={`${styles.navArrow} ${styles.rightArrow}`}
                            onClick={goToNext}
                            disabled={isTransitioning}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Enhanced Mobile Layout with Top/Bottom Navigation */}
                {isMobile && (
                    <div className={styles.mobileLayout}>
                        {/* Top Navigation Arrow */}
                        <button
                            className={`${styles.mobileNavArrow} ${styles.topArrow}`}
                            onClick={scrollToPrevious}
                            disabled={isTransitioning}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                            </svg>
                        </button>

                        <div className={styles.mobileContainer}>
                            <div
                                className={`${styles.mobileVideoCard} ${styles.active} ${isTransitioning ? styles.transitioning : ''}`}
                            >
                                <div className={styles.mobileVideoInner}>
                                    <video
                                        ref={el => mobileVideoRefs.current[currentIndex] = el}
                                        className={styles.mobileVideo}
                                        loop
                                        muted={isMuted}
                                        playsInline
                                        poster={videos[currentIndex].thumbnail}
                                        preload="metadata"
                                        onClick={() => setShowController(!showController)}
                                    >
                                        <source src={videos[currentIndex].video} type="video/mp4" />
                                        <source src={videos[currentIndex].video} type="video/quicktime" />
                                    </video>

                                    {/* Mobile Video Controller */}
                                    <div className={`${styles.mobileVideoController} ${showController ? styles.show : ''}`}>
                                        {/* Progress Bar */}
                                        <div className={styles.mobileProgressContainer}>
                                            <div
                                                className={styles.mobileProgressBar}
                                                onClick={handleProgressClick}
                                                ref={progressBarRef}
                                            >
                                                <div
                                                    className={styles.mobileProgressFill}
                                                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        <div className={styles.mobileControls}>
                                            <div className={styles.mobileLeftControls}>
                                                <button className={styles.mobileControlBtn} onClick={togglePlayPause}>
                                                    {isPlaying ? (
                                                        <svg width="18" height="18" viewBox="0 0 24 24">
                                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="18" height="18" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z" fill="currentColor" />
                                                        </svg>
                                                    )}
                                                </button>

                                                <button className={styles.mobileControlBtn} onClick={toggleMute}>
                                                    {isMuted ? (
                                                        <svg width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63z" fill="currentColor" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor" />
                                                        </svg>
                                                    )}
                                                </button>

                                                <div className={styles.mobileTimeDisplay}>
                                                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                                                </div>
                                            </div>

                                            <div className={styles.mobileRightControls}>
                                                <button className={styles.mobileControlBtn} onClick={scrollToPrevious}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24">
                                                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor" />
                                                    </svg>
                                                </button>

                                                <button className={styles.mobileControlBtn} onClick={scrollToNext}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24">
                                                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" fill="currentColor" />
                                                    </svg>
                                                </button>

                                                <button className={styles.mobileControlBtn} onClick={toggleFullscreen}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24">
                                                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Mobile Video Info */}
                                        <div className={styles.mobileVideoInfo}>
                                            <h4 className={styles.mobileVideoTitle}>{videos[currentIndex].title}</h4>
                                            <span className={styles.mobileVideoCategory}>{videos[currentIndex].category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.mobileVideoEffects}>
                                    <div className={styles.shimmer}></div>
                                    <div className={styles.glow}></div>
                                </div>
                            </div>

                            {/* Video Progress Dots */}
                            <div className={styles.progressDots}>
                                {videos.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.progressDot} ${index === currentIndex ? styles.active : ''}`}
                                        onClick={() => !isTransitioning && setCurrentIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Bottom Navigation Arrow */}
                        <button
                            className={`${styles.mobileNavArrow} ${styles.bottomArrow}`}
                            onClick={scrollToNext}
                            disabled={isTransitioning}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Enhanced Stats Section */}
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
