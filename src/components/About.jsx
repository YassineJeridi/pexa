// components/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import pexaImage from '../assets/images/pexa image.png';
import callIcon from '../assets/contact icons/call.png';
import locationIcon from '../assets/contact icons/location.png';
import mailIcon from '../assets/contact icons/mail.png';
import adobeIcon from '../assets/contact icons/Adobe_Creative_Cloud.png';
import sfxIcon from '../assets/contact icons/SFX ICONS.png';
import vfxIcon from '../assets/contact icons/VFX.png';
import styles from '../styles/About.module.css';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const contactItems = [
        { icon: callIcon, label: 'Phone', value: '+216 92 861 655' },
        { icon: locationIcon, label: 'Location', value: 'Manouba, Denden' },
        { icon: mailIcon, label: 'Email', value: 'yassine.jeridi@redixsolutions.pro' }
    ];

    const skillItems = [
        { icon: adobeIcon, label: 'Adobe Creative Cloud', value: 'The entire adobe Softwares' },
        { icon: sfxIcon, label: 'Sound Design', value: 'Sound design thinking (SFX)' },
        { icon: vfxIcon, label: 'VFX', value: 'Know basic VFX' }
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
            id="about"
            className={`${styles.about} ${isVisible ? styles.visible : ''}`}
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
                <div className={styles.aboutContent}>
                    <div className={styles.profileSection}>
                        <div className={styles.profileCard}>
                            <div className={styles.profileImage}>
                                <img src={pexaImage} alt="Pexa Profile" />
                                <div className={styles.imageGlow}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.aboutText}>
                            <div className={styles.titleWrapper}>
                                <h2 className={styles.title}>ABOUT</h2>
                                <div className={styles.titleGlow}></div>
                            </div>
                            <p className={styles.description}>
                                My name is Khanh Van, I have a great passion for content creation,
                                my dream is to become a content creator (KOL) in the future. We hope
                                that our products will be more and more well received on platforms.
                            </p>
                        </div>

                        <div className={styles.bottomSections}>
                            <div className={styles.contactSection}>
                                <h3 className={styles.sectionTitle}>CONTACT</h3>
                                <div className={styles.contactItems}>
                                    {contactItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className={styles.contactItem}
                                            style={{
                                                '--index': index,
                                                '--delay': `${index * 0.1}s`
                                            }}
                                        >
                                            <div className={styles.itemIcon}>
                                                <img src={item.icon} alt={item.label} />
                                            </div>
                                            <span className={styles.itemValue}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.skillsSection}>
                                <h3 className={styles.sectionTitle}>SKILLS</h3>
                                <div className={styles.skillsItems}>
                                    {skillItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className={styles.skillItem}
                                            style={{
                                                '--index': index,
                                                '--delay': `${(index + 3) * 0.1}s`
                                            }}
                                        >
                                            <div className={styles.itemIcon}>
                                                <img src={item.icon} alt={item.label} />
                                            </div>
                                            <span className={styles.itemValue}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
