// pages/ShowcasePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ShowcasePage.css';

const ShowcasePage = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const showcaseData = [
        {
            id: 1,
            title: 'REDIX Digital Solutions Brand Video',
            category: 'branding',
            year: '2024',
            description: 'Complete brand video production for REDIX Digital Solutions startup launch.',
            longDescription: 'This comprehensive brand video was created to establish REDIX Digital Solutions as a leading digital agency. The project involved concept development, scriptwriting, filming, and post-production with advanced motion graphics and color grading.',
            image: '/src/assets/showcase/redix-brand.jpg',
            videoUrl: '/src/assets/videos/redix-brand.mp4',
            tags: ['Branding', 'Startup', 'Motion Graphics', 'Color Grading'],
            client: 'REDIX Digital Solutions',
            duration: '2:30',
            awards: ['Best Startup Video 2024', 'Creative Excellence Award'],
            tools: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve']
        },
        {
            id: 2,
            title: 'ISAMM Microsoft Club Documentary',
            category: 'documentary',
            year: '2023',
            description: 'Documentary showcasing the impact of Microsoft Student Club activities.',
            longDescription: 'A comprehensive documentary highlighting the journey and achievements of ISAMM Microsoft Club. Features interviews with members, event coverage, and behind-the-scenes content showcasing the club\'s technological initiatives.',
            image: '/src/assets/showcase/isamm-doc.jpg',
            videoUrl: '/src/assets/videos/isamm-doc.mp4',
            tags: ['Documentary', 'Education', 'Technology', 'Community'],
            client: 'ISAMM Microsoft Club',
            duration: '12:45',
            awards: ['Student Film Festival Winner'],
            tools: ['Adobe Premiere Pro', 'Audition', 'Lightroom']
        },
        {
            id: 3,
            title: 'Novart Production Showreel',
            category: 'commercial',
            year: '2024',
            description: 'High-energy showreel highlighting Novart Production capabilities.',
            longDescription: 'A dynamic showreel demonstrating the full range of Novart Production services. Fast-paced editing, synchronized music, and stunning visuals showcase the company\'s creative capabilities and technical expertise.',
            image: '/src/assets/showcase/novart-showreel.jpg',
            videoUrl: '/src/assets/videos/novart-showreel.mp4',
            tags: ['Showreel', 'Commercial', 'Fast-paced', 'Music Sync'],
            client: 'Novart Production',
            duration: '1:45',
            awards: ['Creative Showreel Award'],
            tools: ['Adobe Premiere Pro', 'After Effects', 'Cinema 4D']
        },
        {
            id: 4,
            title: 'Tech Conference Highlight Reel',
            category: 'event',
            year: '2024',
            description: 'Dynamic highlight reel from international technology conference.',
            longDescription: 'Comprehensive coverage of a major technology conference, featuring keynote speakers, panel discussions, and networking sessions. The video captures the energy and innovation of the event while maintaining professional quality throughout.',
            image: '/src/assets/showcase/tech-conference.jpg',
            videoUrl: '/src/assets/videos/tech-conference.mp4',
            tags: ['Event', 'Technology', 'Conference', 'Multi-camera'],
            client: 'Tech Conference International',
            duration: '5:20',
            awards: ['Best Event Coverage 2024'],
            tools: ['Adobe Premiere Pro', 'Multi-camera editing', 'Color correction']
        },
        {
            id: 5,
            title: 'Creative Motion Graphics Demo',
            category: 'motion',
            year: '2024',
            description: 'Showcase of advanced motion graphics and animation skills.',
            longDescription: 'A demonstration of cutting-edge motion graphics techniques, including 3D animation, particle effects, and complex transitions. This piece showcases technical proficiency and creative vision in motion design.',
            image: '/src/assets/showcase/motion-graphics.jpg',
            videoUrl: '/src/assets/videos/motion-graphics.mp4',
            tags: ['Motion Graphics', '3D Animation', 'Particles', 'Creative'],
            client: 'Personal Project',
            duration: '3:15',
            awards: ['Motion Design Excellence'],
            tools: ['After Effects', 'Cinema 4D', 'Element 3D']
        },
        {
            id: 6,
            title: 'Music Video Production',
            category: 'music',
            year: '2023',
            description: 'Artistic music video with creative cinematography and editing.',
            longDescription: 'A visually stunning music video that combines artistic cinematography with innovative editing techniques. The project involved location scouting, creative lighting, and post-production effects to create a unique visual narrative.',
            image: '/src/assets/showcase/music-video.jpg',
            videoUrl: '/src/assets/videos/music-video.mp4',
            tags: ['Music Video', 'Cinematography', 'Creative', 'Artistic'],
            client: 'Independent Artist',
            duration: '4:30',
            awards: ['Best Music Video 2023'],
            tools: ['Adobe Premiere Pro', 'After Effects', 'Color grading']
        }
    ];

    const categories = [
        { id: 'all', name: 'All Projects', count: showcaseData.length },
        { id: 'branding', name: 'Branding', count: showcaseData.filter(p => p.category === 'branding').length },
        { id: 'documentary', name: 'Documentary', count: showcaseData.filter(p => p.category === 'documentary').length },
        { id: 'commercial', name: 'Commercial', count: showcaseData.filter(p => p.category === 'commercial').length },
        { id: 'event', name: 'Event', count: showcaseData.filter(p => p.category === 'event').length },
        { id: 'motion', name: 'Motion Graphics', count: showcaseData.filter(p => p.category === 'motion').length },
        { id: 'music', name: 'Music Videos', count: showcaseData.filter(p => p.category === 'music').length }
    ];

    const filteredProjects = filterCategory === 'all'
        ? showcaseData
        : showcaseData.filter(project => project.category === filterCategory);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleBackToWorks = () => {
        navigate('/');
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseProject = () => {
        setSelectedProject(null);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading Showcase...</p>
            </div>
        );
    }

    return (
        <div className="showcase-page">
            {/* Header */}
            <header className="showcase-header">
                <div className="container">
                    <button className="back-button" onClick={handleBackToWorks}>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                        </svg>
                        Back to Works
                    </button>

                    <div className="header-content">
                        <h1>Showcase Portfolio</h1>
                        <p>Best creative work and professional achievements</p>
                        <div className="stats">
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Awards</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">5</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Categories Filter */}
            <section className="categories-section">
                <div className="container">
                    <div className="categories-filter">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${filterCategory === category.id ? 'active' : ''}`}
                                onClick={() => setFilterCategory(category.id)}
                            >
                                {category.name}
                                <span className="category-count">{category.count}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Grid */}
            <section className="showcase-grid-section">
                <div className="container">
                    <div className="showcase-grid">
                        {filteredProjects.map(project => (
                            <div
                                key={project.id}
                                className="showcase-card"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div className="showcase-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="showcase-overlay">
                                        <button className="view-button">
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
                                            </svg>
                                        </button>
                                        <div className="project-info">
                                            <div className="project-year">{project.year}</div>
                                            <div className="project-duration">{project.duration}</div>
                                        </div>
                                    </div>
                                    <div className="project-category">{project.category}</div>
                                </div>

                                <div className="showcase-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-client">
                                        <span>Client: {project.client}</span>
                                    </div>

                                    <div className="project-tags">
                                        {project.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="tag">{tag}</span>
                                        ))}
                                    </div>

                                    {project.awards && project.awards.length > 0 && (
                                        <div className="project-awards">
                                            <svg width="16" height="16" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
                                            </svg>
                                            <span>{project.awards[0]}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <div className="project-modal">
                    <div className="modal-backdrop" onClick={handleCloseProject}></div>
                    <div className="modal-content">
                        <button className="close-modal" onClick={handleCloseProject}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
                            </svg>
                        </button>

                        <div className="modal-video">
                            <video controls autoPlay muted>
                                <source src={selectedProject.videoUrl} type="video/mp4" />
                            </video>
                        </div>

                        <div className="modal-details">
                            <div className="modal-header">
                                <h2>{selectedProject.title}</h2>
                                <div className="modal-meta">
                                    <span className="modal-year">{selectedProject.year}</span>
                                    <span className="modal-duration">{selectedProject.duration}</span>
                                    <span className="modal-category">{selectedProject.category}</span>
                                </div>
                            </div>

                            <div className="modal-description">
                                <p>{selectedProject.longDescription}</p>
                            </div>

                            <div className="modal-client">
                                <h4>Client</h4>
                                <p>{selectedProject.client}</p>
                            </div>

                            <div className="modal-tags">
                                <h4>Tags</h4>
                                <div className="tags-list">
                                    {selectedProject.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-tools">
                                <h4>Tools Used</h4>
                                <div className="tools-list">
                                    {selectedProject.tools.map((tool, index) => (
                                        <span key={index} className="tool">{tool}</span>
                                    ))}
                                </div>
                            </div>

                            {selectedProject.awards && selectedProject.awards.length > 0 && (
                                <div className="modal-awards">
                                    <h4>Awards</h4>
                                    <div className="awards-list">
                                        {selectedProject.awards.map((award, index) => (
                                            <div key={index} className="award">
                                                <svg width="16" height="16" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
                                                </svg>
                                                <span>{award}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowcasePage;
