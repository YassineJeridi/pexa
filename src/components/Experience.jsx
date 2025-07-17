// components/Experience.jsx
import React, { useState, useEffect, useRef } from 'react';
import imcLogo from '../assets/logos/IMC.png';
import novartLogo from '../assets/logos/novart.png';
import redixLogo from '../assets/logos/redix.png';
import styles from '../styles/Experience.module.css';

const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    const experiences = [
        {
            id: 1,
            year: '2022',
            title: 'ISAMM MICROSOFT CLUB',
            subtitle: 'Production Teamleader',
            logo: imcLogo,
            logoAlt: 'ISAMM Microsoft Club',
            description: 'Led production team initiatives and managed creative projects for the Microsoft Student Club.',
            skills: ['Team Leadership', 'Project Management', 'Creative Direction'],
            duration: '6 months',
            category: 'Leadership',
            color: '#6366F1'
        },
        {
            id: 2,
            year: '2023',
            title: 'ISAMM MICROSOFT CLUB',
            subtitle: 'Production Manager',
            logo: imcLogo,
            logoAlt: 'ISAMM Microsoft Club',
            description: 'Managed production workflows and coordinated multimedia content creation.',
            skills: ['Production Management', 'Content Strategy', 'Quality Control'],
            duration: '12 months',
            category: 'Management',
            color: '#8B5CF6'
        },
        {
            id: 3,
            year: '2024',
            title: 'NOVART Production',
            subtitle: 'Production Manager',
            logo: novartLogo,
            logoAlt: 'Novart Production',
            description: 'Oversaw video production processes and maintained high-quality standards.',
            skills: ['Video Production', 'Post-Production', 'Client Management'],
            duration: '8 months',
            category: 'Production',
            color: '#3B82F6'
        },
        {
            id: 4,
            year: '2025',
            title: 'CO - Founder Of',
            subtitle: 'REDIX Digital Solutions',
            logo: redixLogo,
            logoAlt: 'Redix Digital Solutions',
            description: 'Co-founded digital solutions company focusing on innovative content creation.',
            skills: ['Entrepreneurship', 'Business Development', 'Strategic Planning'],
            duration: 'Present',
            isCurrentPosition: true,
            category: 'Entrepreneurship',
            color: '#10B981'
        }
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
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
            ref={sectionRef}
            id="experience"
            className={`${styles.experience} ${isVisible ? styles.visible : ''}`}
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
                        <h2 className={styles.title}>Experience</h2>
                        <div className={styles.titleGlow}></div>
                    </div>
                    <p className={styles.subtitle}>
                        My professional journey through innovative organizations and creative leadership
                    </p>
                </div>

                <div className={styles.timelineContainer}>
                    <div className={styles.timeline}>
                        <div className={styles.timelineLine}>
                            <div className={styles.timelineProgress}></div>
                        </div>

                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className={`${styles.timelineItem} ${index === activeIndex ? styles.active : ''
                                    } ${hoveredItem === exp.id ? styles.hovered : ''}`}
                                onMouseEnter={() => {
                                    setActiveIndex(index);
                                    setHoveredItem(exp.id);
                                }}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    '--index': index,
                                    '--delay': `${index * 0.1}s`,
                                    '--exp-color': exp.color
                                }}
                            >
                                <div className={styles.timelineYear}>
                                    <div className={styles.yearBadge}>
                                        <span className={styles.year}>{exp.year}</span>
                                        <span className={styles.duration}>{exp.duration}</span>
                                    </div>
                                </div>

                                <div className={styles.timelineLogo}>
                                    <div className={styles.logoContainer}>
                                        <img src={exp.logo} alt={exp.logoAlt} className={styles.logoImage} />
                                        <div className={styles.logoGlow}></div>
                                    </div>
                                    <div className={styles.connectionLine}></div>
                                </div>

                                <div className={styles.timelineContent}>
                                    <div className={styles.contentCard}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.experienceTitle}>{exp.title}</h3>
                                            <p className={styles.position}>{exp.subtitle}</p>
                                            <span className={styles.category}>{exp.category}</span>
                                            {exp.isCurrentPosition && (
                                                <div className={styles.currentBadge}>
                                                    <div className={styles.pulse}></div>
                                                    <span>Current</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.cardBody}>
                                            <p className={styles.description}>{exp.description}</p>
                                            <div className={styles.skillsContainer}>
                                                {exp.skills.map((skill, skillIndex) => (
                                                    <span key={skillIndex} className={styles.skillTag}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.itemEffects}>
                                    <div className={styles.shimmer}></div>
                                    <div className={styles.glow}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{experiences.length}</div>
                        <div className={styles.statLabel}>Positions</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>3+</div>
                        <div className={styles.statLabel}>Years</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>100%</div>
                        <div className={styles.statLabel}>Growth</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
