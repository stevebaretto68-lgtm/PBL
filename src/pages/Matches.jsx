import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import '../styles/Matches.css';
import { useAuth } from '../contexts/AuthContext'; 
import { mockRoommates, calculateMatchPercentage } from '../data/mockData'; 

// Helper function to calculate the circular progress offset
const circumference = 2 * Math.PI * 52; 

const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'green';
    if (percentage >= 65) return 'yellow';
    return 'blue';
};

const MatchCard = ({ userProfile, roommate }) => {
    const match = calculateMatchPercentage(userProfile, roommate);
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
                <div className="match-avatar" style={{ backgroundImage: `url(${roommate.imageUrl})` }}></div>
                <div className={`match-badge badge-${matchColor}`}>{match}% Match</div>
            </div>
            
            <div className="match-info-center">
                <h3 className="match-name">{roommate.name}, {roommate.age}</h3>
                <p className="match-location">{roommate.location}</p>
                <p className="match-description">{roommate.description}</p>
                <div className="match-tags">
                    {roommate.tags.map(tag => (
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
    const { user } = useAuth();
    const userProfile = user?.profile;
    
    const [selectedSort, setSelectedSort] = useState('Compatibility');
    const [rentFilter, setRentFilter] = useState(1200);
    const [lifestyleFilters, setLifestyleFilters] = useState({
        'Early Bird': false,
        'Night Owl': false,
        'Pet-Friendly': true,
        'Neat Freak': true, // Changed 'Very Clean' to 'Neat Freak' for schema alignment
    });

    const handleRentChange = (e) => setRentFilter(Number(e.target.value));
    
    const handleLifestyleChange = (name) => {
        setLifestyleFilters(prev => ({ ...prev, [name]: !prev[name] }));
    };


    // --- Dynamic Filtering Logic ---
    const filteredRoommates = mockRoommates.filter(roommate => {
        // 1. Rent Range Filter 
        if (roommate.profile.budgetMin > rentFilter) {
            return false;
        }
        
        // 2. Lifestyle Filters (Check if roommate meets ALL CHECKED criteria)
        for (const [key, isChecked] of Object.entries(lifestyleFilters)) {
            if (isChecked) {
                // Map filter keys to profile fields for checking
                const profileField = {
                    'Early Bird': roommate.profile.sleepSchedule === 'Early Bird',
                    'Night Owl': roommate.profile.sleepSchedule === 'Night Owl',
                    'Pet-Friendly': roommate.profile.petFriendly === true,
                    'Neat Freak': roommate.profile.cleanliness === 'Neat Freak',
                };
                
                if (!profileField[key]) return false;
            }
        }
        
        return true;
    });


    // Sort matches dynamically based on calculated percentage
    const sortedMatches = filteredRoommates.sort((a, b) => {
        const matchA = calculateMatchPercentage(userProfile, a);
        const matchB = calculateMatchPercentage(userProfile, b);
        if (selectedSort === 'Compatibility') {
            return matchB - matchA; // Highest match first
        }
        return 0; // Default sort
    });
    

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
                                <select 
                                    id="sort-by" 
                                    className="sort-select"
                                    value={selectedSort}
                                    onChange={(e) => setSelectedSort(e.target.value)}
                                >
                                    <option>Compatibility</option>
                                    <option>Rent (Low to High)</option>
                                    <option>Rent (High to Low)</option>
                                    <option>Move-in Date</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <h3 className="filter-heading">Rent Range</h3>
                                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Max Rent: ${rentFilter}</p>
                                <input 
                                    className="rent-slider" 
                                    type="range" 
                                    min="300" 
                                    max="2500" 
                                    value={rentFilter}
                                    onChange={handleRentChange}
                                />
                                <div className="rent-range-labels">
                                    <span>$300</span>
                                    <span>$2500+</span>
                                </div>
                            </div>

                            <div className="filter-group">
                                <h3 className="filter-heading">Lifestyle</h3>
                                <div className="lifestyle-checkboxes">
                                    {Object.keys(lifestyleFilters).map(name => (
                                        <label key={name} className="checkbox-label">
                                            <input 
                                                type="checkbox" 
                                                className="custom-checkbox" 
                                                checked={lifestyleFilters[name]}
                                                onChange={() => handleLifestyleChange(name)}
                                            />
                                            <span>{name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button className="apply-filters-btn">
                                Apply Filters ({sortedMatches.length} matches)
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
                            {sortedMatches.length > 0 ? (
                                sortedMatches.map((roommate) => (
                                    <MatchCard 
                                        key={roommate.id} 
                                        roommate={roommate} 
                                        userProfile={userProfile} 
                                    />
                                ))
                            ) : (
                                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-gray)' }}>
                                    No matches found for your current filters.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Matches;