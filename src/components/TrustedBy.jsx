// components/TrustedBy.jsx
import React, { useState, useEffect, useRef } from 'react';
import aiesecLogo from '../assets/logos/aiesec LOGO.png';
import coinLogo from '../assets/logos/coin logo.png';
import esenAmbassadorsLogo from '../assets/logos/ESEN AMBASSADORS LOGO.png';
import esenMicrosoftClubLogo from '../assets/logos/esen microsoft club logo.jpg';
import esenManoubaLogo from '../assets/logos/esen-manouba.png';
import esenManoubaALogo from '../assets/logos/esen-manoubaA.png';
import flayesLogo from '../assets/logos/FLAYES.png';
import fritaLogo from '../assets/logos/frita logo.png';
import g8Logo from '../assets/logos/G8.png';
import ghamzaLogo from '../assets/logos/ghamza.png';
import ifLogo from '../assets/logos/if.svg';
import imcLogo from '../assets/logos/IMC.png';
import isammLogo from '../assets/logos/isamm logo.png';
import jciManoubaLogo from '../assets/logos/JCI-Manouba.png';
import moatezLogo from '../assets/logos/Moatez  logo (2).png';
import novartLogo from '../assets/logos/novart.png';
import orchideeLogo from '../assets/logos/orchidee logo.png';
import redixLogo from '../assets/logos/redix.png';
import sbhLogo from '../assets/logos/sbh.png';
import styles from '../styles/TrustedBy.module.css';

const TrustedBy = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredLogo, setHoveredLogo] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const trustedLogos = [
        { id: 1, logo: jciManoubaLogo, name: 'JCI Manouba', category: 'Organization' },
        { id: 2, logo: esenManoubaLogo, name: 'ESEN Manouba', category: 'Education' },
        { id: 3, logo: isammLogo, name: 'ISAMM', category: 'Education' },
        { id: 4, logo: esenAmbassadorsLogo, name: 'ESEN Ambassadors', category: 'Organization' },
        { id: 5, logo: flayesLogo, name: 'Flayes', category: 'Brand' },
        { id: 6, logo: orchideeLogo, name: 'Orchidée Bleue', category: 'Hospitality' },
        { id: 7, logo: aiesecLogo, name: 'AIESEC', category: 'Organization' },
        { id: 8, logo: novartLogo, name: 'Novart', category: 'Media' },
        { id: 9, logo: esenMicrosoftClubLogo, name: 'Microsoft Club', category: 'Technology' },
        { id: 10, logo: ifLogo, name: 'Institut Français', category: 'Education' },
        { id: 11, logo: sbhLogo, name: 'SBH Medical', category: 'Healthcare' },
        { id: 12, logo: coinLogo, name: 'Le Coin', category: 'Restaurant' },
        { id: 13, logo: g8Logo, name: 'G8', category: 'Organization' },
        { id: 14, logo: ghamzaLogo, name: 'Ghamza', category: 'Brand' },
        { id: 15, logo: redixLogo, name: 'Redix', category: 'Technology' }
    ];

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
        <section
            ref={containerRef}
            className={`${styles.trustedBy} ${isVisible ? styles.visible : ''}`}
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
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <h2 className={styles.title}>Trusted By</h2>
                        <div className={styles.titleGlow}></div>
                    </div>
                    <p className={styles.subtitle}>
                        Partnering with industry leaders and innovative organizations
                    </p>
                </div>

                <div className={styles.logoGrid}>
                    {trustedLogos.map((item, index) => (
                        <div
                            key={item.id}
                            className={`${styles.logoCard} ${hoveredLogo === item.id ? styles.hovered : ''}`}
                            onMouseEnter={() => setHoveredLogo(item.id)}
                            onMouseLeave={() => setHoveredLogo(null)}
                            style={{
                                '--index': index,
                                '--delay': `${index * 0.08}s`
                            }}
                        >
                            <div className={styles.cardInner}>
                                <div className={styles.logoContainer}>
                                    <img
                                        src={item.logo}
                                        alt={item.name}
                                        className={styles.logoImage}
                                        loading="lazy"
                                    />
                                </div>
                                <div className={styles.logoOverlay}>
                                    <div className={styles.logoInfo}>
                                        <span className={styles.logoName}>{item.name}</span>
                                        <span className={styles.logoCategory}>{item.category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardEffects}>
                                <div className={styles.shimmer}></div>
                                <div className={styles.glow}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>15+</div>
                        <div className={styles.statLabel}>Partners</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>5+</div>
                        <div className={styles.statLabel}>Years</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>100%</div>
                        <div className={styles.statLabel}>Success</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
