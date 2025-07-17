// pages/ReelsPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReelsPage.css';

const ReelsPage = () => {
    const [currentReel, setCurrentReel] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'player'
    const videoRefs = useRef([]);
    const navigate = useNavigate();

    const reelsData = [
        {
            id: 1,
            title: 'Brand Showcase',
            description: 'Creative brand presentation for tech startup',
            videoUrl: '/src/assets/videos/reel1.mp4',
            thumbnail: '/src/assets/thumbnails/reel1.jpg',
            platform: 'instagram',
            views: '15.2K',
            likes: '2.1K',
            tags: ['Brand', 'Tech', 'Startup'],
            duration: '00:30'
        },
        {
            id: 2,
            title: 'Product Demo',
            description: 'Quick product demonstration for social media',
            videoUrl: '/src/assets/videos/reel2.mp4',
            thumbnail: '/src/assets/thumbnails/reel2.jpg',
            platform: 'tiktok',
            views: '28.5K',
            likes: '4.3K',
            tags: ['Product', 'Demo', 'Commercial'],
            duration: '00:15'
        },
        {
            id: 3,
            title: 'Behind the Scenes',
            description: 'Behind the scenes of video production',
            videoUrl: '/src/assets/videos/reel3.mp4',
            thumbnail: '/src/assets/thumbnails/reel3.jpg',
            platform: 'youtube',
            views: '12.8K',
            likes: '1.9K',
            tags: ['BTS', 'Production', 'Creative'],
            duration: '00:45'
        },
        {
            id: 4,
            title: 'Event Highlights',
            description: 'Quick highlights from recent corporate event',
            videoUrl: '/src/assets/videos/reel4.mp4',
            thumbnail: '/src/assets/thumbnails/reel4.jpg',
            platform: 'instagram',
            views: '22.1K',
            likes: '3.2K',
            tags: ['Event', 'Corporate', 'Highlights'],
            duration: '00:60'
        },
        {
            id: 5,
            title: 'Tutorial Content',
            description: 'Quick tutorial on video editing techniques',
            videoUrl: '/src/assets/videos/reel5.mp4',
            thumbnail: '/src/assets/thumbnails/reel5.jpg',
            platform: 'tiktok',
            views: '35.7K',
            likes: '5.8K',
            tags: ['Tutorial', 'Editing', 'Tips'],
            duration: '00:30'
        },
        {
            id: 6,
            title: 'Creative Transition',
            description: 'Smooth creative transitions and effects',
            videoUrl: '/src/assets/videos/reel6.mp4',
            thumbnail: '/src/assets/thumbnails/reel6.jpg',
            platform: 'instagram',
            views: '18.4K',
            likes: '2.7K',
            tags: ['Creative', 'Transition', 'Effects'],
            duration: '00:20'
        }
    ];

    const platformColors = {
        instagram: '#E4405F',
        tiktok: '#000000',
        youtube: '#FF0000'
    };

    const handleBackToWorks = () => {
        navigate('/');
    };

    const handleReelClick = (index) => {
        setCurrentReel(index);
        setViewMode('player');
    };

    const handleClosePlayer = () => {
        setViewMode('grid');
        setIsPlaying(false);
    };

    const goToNextReel = () => {
        setCurrentReel((prev) => (prev + 1) % reelsData.length);
    };

    const goToPreviousReel = () => {
        setCurrentReel((prev) => (prev - 1 + reelsData.length) % reelsData.length);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                goToNextReel();
            } else {
                goToPreviousReel();
            }
        }
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        if (viewMode === 'player') {
            const currentVideo = videoRefs.current[currentReel];
            if (currentVideo) {
                if (isPlaying) {
                    currentVideo.play();
                } else {
                    currentVideo.pause();
                }
            }
        }
    }, [currentReel, isPlaying, viewMode]);

    const formatViews = (views) => {
        return views.replace('K', 'K');
    };

    return (
        <div className="reels-page">
            {/* Header */}
            <header className="reels-header">
                <div className="container">
                    <button className="back-button" onClick={handleBackToWorks}>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                        </svg>
                        Back to Works
                    </button>

                    <div className="header-content">
                        <h1>Reels Portfolio</h1>
                        <p>Short-form content for social media platforms</p>
                        <div className="stats">
                            <div className="stat">
                                <span className="stat-number">100+</span>
                                <span className="stat-label">Reels Created</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">2M+</span>
                                <span className="stat-label">Total Views</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">95%</span>
                                <span className="stat-label">Engagement Rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Grid View */}
            {viewMode === 'grid' && (
                <section className="reels-grid-section">
                    <div className="container">
                        <div className="reels-grid">
                            {reelsData.map((reel, index) => (
                                <div
                                    key={reel.id}
                                    className="reel-card"
                                    onClick={() => handleReelClick(index)}
                                >
                                    <div className="reel-thumbnail">
                                        <img src={reel.thumbnail} alt={reel.title} />
                                        <div className="reel-overlay">
                                            <button className="play-button">
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" fill="currentColor" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="reel-duration">{reel.duration}</div>
                                        <div
                                            className="reel-platform"
                                            style={{ backgroundColor: platformColors[reel.platform] }}
                                        >
                                            {reel.platform}
                                        </div>
                                    </div>

                                    <div className="reel-info">
                                        <h3 className="reel-title">{reel.title}</h3>
                                        <p className="reel-description">{reel.description}</p>

                                        <div className="reel-stats">
                                            <div className="stat">
                                                <svg width="16" height="16" viewBox="0 0 24 24">
                                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
                                                </svg>
                                                <span>{formatViews(reel.views)}</span>
                                            </div>
                                            <div className="stat">
                                                <svg width="16" height="16" viewBox="0 0 24 24">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                                                </svg>
                                                <span>{reel.likes}</span>
                                            </div>
                                        </div>

                                        <div className="reel-tags">
                                            {reel.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Player View */}
            {viewMode === 'player' && (
                <section className="reels-player-section">
                    <div className="player-container">
                        <button className="close-player" onClick={handleClosePlayer}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
                            </svg>
                        </button>

                        <div className="player-content">
                            <div
                                className="video-container"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <video
                                    ref={el => videoRefs.current[currentReel] = el}
                                    className="reel-video"
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    poster={reelsData[currentReel].thumbnail}
                                    onClick={togglePlayPause}
                                >
                                    <source src={reelsData[currentReel].videoUrl} type="video/mp4" />
                                </video>

                                <div className="video-controls">
                                    <button className="control-btn" onClick={togglePlayPause}>
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

                                    <button className="control-btn" onClick={toggleMute}>
                                        {isMuted ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24">
                                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor" />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24">
                                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <div className="navigation-arrows">
                                    <button className="nav-arrow up" onClick={goToPreviousReel}>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="currentColor" />
                                        </svg>
                                    </button>

                                    <button className="nav-arrow down" onClick={goToNextReel}>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="reel-details">
                                <div className="reel-info-sidebar">
                                    <h3>{reelsData[currentReel].title}</h3>
                                    <p>{reelsData[currentReel].description}</p>

                                    <div className="reel-stats-sidebar">
                                        <div className="stat">
                                            <svg width="20" height="20" viewBox="0 0 24 24">
                                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
                                            </svg>
                                            <span>{formatViews(reelsData[currentReel].views)} views</span>
                                        </div>
                                        <div className="stat">
                                            <svg width="20" height="20" viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                                            </svg>
                                            <span>{reelsData[currentReel].likes} likes</span>
                                        </div>
                                    </div>

                                    <div className="reel-tags-sidebar">
                                        {reelsData[currentReel].tags.map((tag, index) => (
                                            <span key={index} className="tag">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="reel-counter">
                                        {currentReel + 1} / {reelsData.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ReelsPage;
