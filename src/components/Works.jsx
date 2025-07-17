// components/Works.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import folderIcon from '../assets/images/folder.png';
import vfxIcon from '../assets/contact icons/VFX.png';
import sfxIcon from '../assets/contact icons/SFX ICONS.png';
import styles from '../styles/Works.module.css';

const Works = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const workItems = [
    {
      id: 1,
      title: 'Events',
      icon: folderIcon,
      description: 'Corporate events, conferences, and celebrations',
      route: '/events',
      color: '#FF6B6B',
      bgGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      stats: '25+ Projects',
      tags: ['Corporate', 'Conferences', 'Celebrations'],
      preview: 'Professional event coverage and live streaming',
      category: 'Video Production'
    },
    {
      id: 2,
      title: 'Reels',
      icon: vfxIcon,
      description: 'Short-form content and social media videos',
      route: '/reels',
      color: '#4ECDC4',
      bgGradient: 'linear-gradient(135deg, #4ECDC4 0%, #6EE7DF 100%)',
      stats: '100+ Reels',
      tags: ['Social Media', 'TikTok', 'Instagram'],
      preview: 'Engaging short-form video content',
      category: 'Content Creation'
    },
    {
      id: 3,
      title: 'Showcase',
      icon: sfxIcon,
      description: 'Portfolio highlights and creative projects',
      route: '/showcase',
      color: '#A78BFA',
      bgGradient: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
      stats: '50+ Projects',
      tags: ['Portfolio', 'Creative', 'Highlights'],
      preview: 'Best creative work and achievements',
      category: 'Portfolio'
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

  const navigateTo = (route) => navigate(route);

  return (
    <section
      ref={containerRef}
      id="works"
      className={`${styles.works} ${isVisible ? styles.visible : ''}`}
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
            <h2 className={styles.title}>My Works</h2>
            <div className={styles.titleGlow}></div>
          </div>
          <p className={styles.subtitle}>
            Explore my creative journey through diverse projects and collaborations
          </p>
        </div>

        <div className={styles.worksGrid}>
          {workItems.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.workCard} ${hoveredItem === item.id ? styles.hovered : ''}`}
              onClick={() => navigateTo(item.route)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                '--index': index,
                '--delay': `${index * 0.08}s`,
                '--card-color': item.color
              }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconContainer}>
                    <div className={styles.iconWrapper}>
                      <img
                        src={item.icon}
                        alt={item.title}
                        className={styles.workIcon}
                      />
                    </div>
                    <div className={styles.statsBadge}>{item.stats}</div>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.textContent}>
                    <h3 className={styles.workTitle}>{item.title}</h3>
                    <p className={styles.workDescription}>{item.description}</p>
                  </div>

                  <div className={styles.tagsContainer}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardOverlay}>
                  <div className={styles.overlayContent}>
                    <div className={styles.overlayInfo}>
                      <span className={styles.overlayTitle}>{item.title}</span>
                      <span className={styles.overlayCategory}>{item.category}</span>
                    </div>
                    <div className={styles.overlayAction}>
                      <span>View Projects</span>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor" />
                      </svg>
                    </div>
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
            <div className={styles.statNumber}>175+</div>
            <div className={styles.statLabel}>Projects</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Categories</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Creative</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
