// components/Footer.jsx
import React, { useState, useEffect } from 'react';
import pexaLogo from '../assets/logos/Pexa.png';
import emailIcon from '../assets/footer icons/email black.png';
import facebookIcon from '../assets/footer icons/facebook.png';
import instagramIcon from '../assets/footer icons/instagram.png';
import linkedinIcon from '../assets/footer icons/linkedin.png';
import telegramIcon from '../assets/footer icons/telegram.png';
import whatsappIcon from '../assets/footer icons/whatsapp.png';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const socialLinks = [
        { id: 'facebook', icon: facebookIcon, href: '#', label: 'Facebook' },
        { id: 'linkedin', icon: linkedinIcon, href: '#', label: 'LinkedIn' },
        { id: 'email', icon: emailIcon, href: 'mailto:contact@pexa.com', label: 'Email' },
        { id: 'whatsapp', icon: whatsappIcon, href: '#', label: 'WhatsApp' },
        { id: 'telegram', icon: telegramIcon, href: '#', label: 'Telegram' },
        { id: 'instagram', icon: instagramIcon, href: '#', label: 'Instagram' }
    ];

    const navigationLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Contact', href: '#contact' }
    ];

    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, []);

    return (
        <footer className={styles.footer}>
            {/* Background Effects */}
            <div className={styles.backgroundEffects}>
                <div className={styles.gradientOverlay}></div>
                <div className={styles.particleField}>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={styles.particle}
                            style={{
                                '--delay': `${i * 0.5}s`,
                                '--duration': `${5 + Math.random() * 5}s`,
                                '--size': `${2 + Math.random() * 4}px`,
                                '--x': `${Math.random() * 100}%`,
                                '--y': `${Math.random() * 100}%`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className={styles.container}>
                {/* Footer Content */}
                <div className={styles.footerContent}>
                    {/* Brand Section */}
                    <div className={styles.brandSection}>
                        <div className={styles.logoContainer}>
                            <img
                                src={pexaLogo}
                                alt="Pexa Logo"
                                className={styles.logo}
                            />
                            <div className={styles.logoGlow}></div>
                        </div>
                        <p className={styles.brandDescription}>
                            Creating digital experiences that inspire and engage.
                            Bringing your vision to life through innovative design and development.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className={styles.navigationSection}>
                        <h3 className={styles.sectionTitle}>Navigation</h3>
                        <nav className={styles.navList}>
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={styles.navLink}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Social Media Section */}
                    <div className={styles.socialSection}>
                        <h3 className={styles.sectionTitle}>Connect</h3>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    className={`${styles.socialLink} ${hoveredIcon === social.id ? styles.hovered : ''
                                        }`}
                                    onMouseEnter={() => setHoveredIcon(social.id)}
                                    onMouseLeave={() => setHoveredIcon(null)}
                                    aria-label={social.label}
                                >
                                    <img
                                        src={social.icon}
                                        alt={social.label}
                                        className={styles.socialIcon}
                                    />
                                    <div className={styles.socialIconGlow}></div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className={styles.footerBottom}>
                    <div className={styles.divider}></div>
                    <div className={styles.bottomContent}>
                        <p className={styles.copyright}>
                            © {currentYear} Pexa. All rights reserved.
                        </p>
                        <div className={styles.bottomLinks}>
                            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
                            <a href="#" className={styles.bottomLink}>Terms of Service</a>
                            <a href="#" className={styles.bottomLink}>Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
