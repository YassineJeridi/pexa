// components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import portfolioBanner from '../assets/images/portfolio banner.png';
import styles from '../styles/Header.module.css';

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    return (
        <header
            ref={containerRef}
            className={`${styles.header} ${isVisible ? styles.visible : ''}`}
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

            <div className={styles.container}>
                <div className={styles.heroSection}>
                    <div className={styles.bannerContainer}>
                        <img
                            src={portfolioBanner}
                            alt="Portfolio - Video Editor - Pexa"
                            className={styles.portfolioBanner}
                        />
                        <div className={styles.bannerGlow}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
