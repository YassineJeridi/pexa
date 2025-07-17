// pages/EventsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventsPage.css';

const EventsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Sample events data
    const eventsData = [
        {
            id: 1,
            title: 'Tech Conference 2024',
            category: 'corporate',
            date: '2024-03-15',
            location: 'Convention Center, Manouba',
            description: 'Annual technology conference featuring industry leaders and innovative solutions.',
            image: '/src/assets/images/event1.jpg',
            videoUrl: '/src/assets/videos/event1.mp4',
            tags: ['Technology', 'Conference', 'Corporate'],
            duration: '8 hours',
            attendees: '500+'
        },
        {
            id: 2,
            title: 'Wedding Celebration',
            category: 'celebration',
            date: '2024-05-20',
            location: 'Garden Resort, Tunis',
            description: 'Beautiful wedding ceremony with complete videography coverage.',
            image: '/src/assets/images/event2.jpg',
            videoUrl: '/src/assets/videos/event2.mp4',
            tags: ['Wedding', 'Celebration', 'Personal'],
            duration: '12 hours',
            attendees: '200+'
        },
        {
            id: 3,
            title: 'Corporate Launch Event',
            category: 'corporate',
            date: '2024-06-10',
            location: 'Business Center, Ariana',
            description: 'Product launch event with live streaming and professional coverage.',
            image: '/src/assets/images/event3.jpg',
            videoUrl: '/src/assets/videos/event3.mp4',
            tags: ['Launch', 'Corporate', 'Live Stream'],
            duration: '6 hours',
            attendees: '300+'
        },
        {
            id: 4,
            title: 'Music Festival',
            category: 'entertainment',
            date: '2024-07-05',
            location: 'Open Air Arena, Sousse',
            description: 'Multi-day music festival with multiple stages and artists.',
            image: '/src/assets/images/event4.jpg',
            videoUrl: '/src/assets/videos/event4.mp4',
            tags: ['Music', 'Festival', 'Entertainment'],
            duration: '3 days',
            attendees: '1000+'
        },
        {
            id: 5,
            title: 'Graduation Ceremony',
            category: 'celebration',
            date: '2024-08-12',
            location: 'University Hall, Manouba',
            description: 'University graduation ceremony with family celebrations.',
            image: '/src/assets/images/event5.jpg',
            videoUrl: '/src/assets/videos/event5.mp4',
            tags: ['Graduation', 'Education', 'Celebration'],
            duration: '4 hours',
            attendees: '800+'
        },
        {
            id: 6,
            title: 'Business Summit',
            category: 'conference',
            date: '2024-09-18',
            location: 'International Hotel, Tunis',
            description: 'International business summit with keynote speakers.',
            image: '/src/assets/images/event6.jpg',
            videoUrl: '/src/assets/videos/event6.mp4',
            tags: ['Business', 'Summit', 'International'],
            duration: '2 days',
            attendees: '600+'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Events', count: eventsData.length },
        { id: 'corporate', name: 'Corporate', count: eventsData.filter(e => e.category === 'corporate').length },
        { id: 'celebration', name: 'Celebrations', count: eventsData.filter(e => e.category === 'celebration').length },
        { id: 'conference', name: 'Conferences', count: eventsData.filter(e => e.category === 'conference').length },
        { id: 'entertainment', name: 'Entertainment', count: eventsData.filter(e => e.category === 'entertainment').length }
    ];

    const filteredEvents = selectedCategory === 'all'
        ? eventsData
        : eventsData.filter(event => event.category === selectedCategory);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleBackToWorks = () => {
        navigate('/');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading Events...</p>
            </div>
        );
    }

    return (
        <div className="events-page">
            {/* Header */}
            <header className="events-header">
                <div className="container">
                    <button className="back-button" onClick={handleBackToWorks}>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                        </svg>
                        Back to Works
                    </button>

                    <div className="header-content">
                        <h1>Events Portfolio</h1>
                        <p>Professional event coverage and videography services</p>
                        <div className="stats">
                            <div className="stat">
                                <span className="stat-number">25+</span>
                                <span className="stat-label">Events Covered</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Hours Recorded</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Happy Clients</span>
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
                                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                                <span className="category-count">{category.count}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="events-grid-section">
                <div className="container">
                    <div className="events-grid">
                        {filteredEvents.map(event => (
                            <div key={event.id} className="event-card">
                                <div className="event-image">
                                    <img src={event.image} alt={event.title} />
                                    <div className="event-overlay">
                                        <button className="play-button">
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" fill="currentColor" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="event-category">{event.category}</div>
                                </div>

                                <div className="event-content">
                                    <div className="event-date">{formatDate(event.date)}</div>
                                    <h3 className="event-title">{event.title}</h3>
                                    <p className="event-description">{event.description}</p>

                                    <div className="event-details">
                                        <div className="detail">
                                            <svg width="16" height="16" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                                            </svg>
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="detail">
                                            <svg width="16" height="16" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor" />
                                            </svg>
                                            <span>{event.duration}</span>
                                        </div>
                                        <div className="detail">
                                            <svg width="16" height="16" viewBox="0 0 24 24">
                                                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16.5c-.83 0-1.5.67-1.5 1.5v6h2.5V22h3zm-11.5 0v-6H11v6h3zm-2.5-8H4v2h2.5v-2zm2.5 0H9v2h2.5v-2z" fill="currentColor" />
                                            </svg>
                                            <span>{event.attendees}</span>
                                        </div>
                                    </div>

                                    <div className="event-tags">
                                        {event.tags.map((tag, index) => (
                                            <span key={index} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventsPage;
