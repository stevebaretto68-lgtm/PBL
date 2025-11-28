import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import '../styles/Matches.css';

// Helper function to calculate the circular progress offset
const circumference = 2 * Math.PI * 52; // r=52 in HTML SVG

const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'green';
    if (percentage >= 65) return 'yellow';
    return 'blue';
};

// Mock data for match cards
const mockMatches = [
    { 
        name: 'Sarah, 26', location: 'San Francisco, CA', match: 90, 
        description: '"Creative designer looking for a quiet and clean roommate to share a cozy space."', 
        tags: ['Clean', 'Early Bird', 'Non-Smoker'], 
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAOAIpuqxMwl8_u2cJCCaTYyJCVD-kGPeePiakzgLGk3SJrCy8dDY8DUIKl4PJuHMr8tadsCZAPT0oKPnv_4_efCpbUn5-bcD4ike3qNGzJmiqQZKqYmsOGB1d_74-ZrFlz2zpf-16RyPrQ6hryWF8nKy9DlHzwI9tyysNAKCqkLHnQ5-3kkd6owFR72xSK7QeP8qyBHMdw8EJeeEmTBpyMAGufW6auhnrdqPa1zGMLbym-jYWWs7rzB0xyW4XAU_lFQfs6zgkSkYa' 
    },
    { 
        name: 'Mark, 29', location: 'Brooklyn, NY', match: 72, 
        description: '"Software engineer who enjoys hiking on weekends. Looking for a social and tidy roommate."', 
        tags: ['Night Owl', 'Social', 'Pet-Friendly'], 
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuiXlZVGCRSLF-jZF_RhjA6FH9jnWjMXzulywpUMjBvA5miDcm-iBZVxGzebdvgR2VQMuiEfmR_sB8pCRXaJDwc0866txchUX-MxdfgTGICLwCQakGjyNF7wdd7dJRHv1ud4VKCmlqBFPRkxEydykeaLcCFckLBlRzDhTRvUzA5HgIBxZNSZ9SD00K5XfljD6cuOn_w77dIrwluaSFY7I49UHf9QwOkvJ1Xfh3OdSG8I5AvpvWcDAuUnwjFx1ESW6tb9fsDNPsHknM' 
    },
    { 
        name: 'Emily, 24', location: 'Austin, TX', match: 58, 
        description: '"Grad student who\'s usually at the library. Need a respectful and quiet roommate."', 
        tags: ['Quiet', 'Student', 'Clean'], 
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2Y4f6O5jMWwIGu0WoOaGQcbuBOB1OxjpZk1rbkYZptruHRrpGI5FHMqt7mndDI_J73JiIg9b4fD0ChGdQ6XBjoLIHPtZFgywORqiFkGJkRBYo-xOhv_9HoGjlom8IgEcaI1jvi3Hk8ftQ4Qkg4xpAI5lDNiZapT_u_lCyIf_1cG1sQfsNmJZd0Wx_bevOB3FiEyEXfhIwuj2oyhG-MJ8vKjRGH3gJ6CU3l0YIcP6fDZr_UF0eMJcJ0_SYyktZ0GJDZkrnaSfjQqo' 
    },
];

const MatchCard = ({ name, location, match, description, tags, imageUrl }) => {
    const strokeOffset = circumference - (match / 100) * circumference;
    const matchColor = getMatchColor(match);

    return (
        <div className="match-card">
            <div className="match-visual-area">
                <svg className="match-progress-ring" viewBox="0 0 120 120">
                    <circle className="ring-bg" cx="60" cy="60" r="52"></circle>
                    <circle 
                        className={`ring-progress ring-${matchColor}`} 
                        cx="60" cy="60" r="52" 
                        strokeDasharray={circumference} 
                        strokeDashoffset={strokeOffset}
                    ></circle>
                </svg>
                <div className="match-avatar" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                <div className={`match-badge badge-${matchColor}`}>{match}% Match</div>
            </div>
            
            <div className="match-info-center">
                <h3 className="match-name">{name}</h3>
                <p className="match-location">{location}</p>
                <p className="match-description">{description}</p>
                <div className="match-tags">
                    {tags.map(tag => (
                        <span key={tag} className="match-tag">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="match-actions">
                <button className="view-profile-btn">View Profile</button>
                <button className="action-icon-btn">
                    <span className="material-symbols-outlined">chat_bubble_outline</span>
                </button>
                <button className="action-icon-btn">
                    <span className="material-symbols-outlined">favorite_border</span>
                </button>
            </div>
        </div>
    );
};

const Matches = () => {
    return (
        <div className="matches-wrapper">
            <TopNavBar activeLink="Matches" />
            <main className="matches-main-content">
                <div className="matches-layout-grid">
                    {/* Filters Sidebar */}
                    <aside className="matches-filters-aside">
                        <div className="filters-sticky-container">
                            <h2 className="filters-title">Filters</h2>
                            
                            <div className="filter-group-search">
                                <div className="search-input-wrapper">
                                    <span className="material-symbols-outlined">search</span>
                                    <input type="text" placeholder="Search by name, location..." className="search-input" />
                                </div>
                            </div>
                            
                            <div className="filter-group">
                                <label htmlFor="sort-by" className="filter-label">Sort by</label>
                                <select id="sort-by" className="sort-select">
                                    <option>Compatibility</option>
                                    <option>Rent (Low to High)</option>
                                    <option>Rent (High to Low)</option>
                                    <option>Move-in Date</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <h3 className="filter-heading">Rent Range</h3>
                                <input className="rent-slider" type="range" min="300" max="2500" defaultValue="1200" />
                                <div className="rent-range-labels">
                                    <span>$300</span>
                                    <span>$2500+</span>
                                </div>
                            </div>

                            <div className="filter-group">
                                <h3 className="filter-heading">Lifestyle</h3>
                                <div className="lifestyle-checkboxes">
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="custom-checkbox" />
                                        <span>Early Bird</span>
                                    </label>
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="custom-checkbox" />
                                        <span>Night Owl</span>
                                    </label>
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="custom-checkbox" />
                                        <span>Pet-Friendly</span>
                                    </label>
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="custom-checkbox" defaultChecked />
                                        <span>Very Clean</span>
                                    </label>
                                </div>
                            </div>

                            <button className="apply-filters-btn">
                                Apply Filters
                            </button>
                        </div>
                    </aside>

                    {/* Main Content: Match Cards */}
                    <section className="matches-list-section">
                        <div className="matches-header">
                            <h1 className="matches-page-title">Your Roommate Matches</h1>
                            <p className="matches-page-subtitle">Based on your lifestyle and preferences</p>
                        </div>
                        <div className="matches-grid">
                            {mockMatches.map((match, index) => (
                                <MatchCard key={index} {...match} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Matches;