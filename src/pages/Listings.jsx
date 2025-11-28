import React, { useState } from 'react'; 
import TopNavBar from '../components/TopNavBar';
import '../styles/Listings.css'; 
import { useAuth } from '../contexts/AuthContext'; 
import { mockListings } from '../data/mockData'; 

const FilterButton = ({ text, icon, isActive = false, isSort = false }) => (
    <button className={`filter-chip ${isActive ? 'active' : ''}`}>
        <p className="filter-chip-text">{text}</p>
        {!isSort && <span className="material-symbols-outlined filter-chip-icon">expand_more</span>}
    </button>
);

const ListingCard = ({ title, price, details, amenities, imageUrl }) => (
    <div className="listing-card">
        <div className="listing-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div className="listing-content">
            <p className="listing-title">{title}</p>
            <p className="listing-details">${price}/month · {details}</p>
            <div className="listing-amenities">
                {amenities.map(amenity => (
                    <span key={amenity} className="material-symbols-outlined" title={amenity}>{amenity}</span>
                ))}
            </div>
        </div>
    </div>
);


const Listings = () => {
    const { user } = useAuth();
    
    // Filtering states
    const [selectedGender, setSelectedGender] = useState('Any');
    const [budgetFilter, setBudgetFilter] = useState(2500);
    const [petsFilter, setPetsFilter] = useState(false);

    const handleGenderChange = (gender) => setSelectedGender(gender);
    const handleBudgetChange = (e) => setBudgetFilter(Number(e.target.value));
    const handlePetsChange = (e) => setPetsFilter(e.target.checked);

    // --- Dynamic Filtering Logic ---
    const filteredListings = mockListings.filter(listing => {
        // 1. Gender Filter
        if (selectedGender !== 'Any' && listing.gender !== 'Any' && listing.gender !== selectedGender) {
            return false;
        }

        // 2. Budget Filter
        if (listing.price > budgetFilter) {
            return false;
        }
        
        // 3. Pets Filter
        if (petsFilter && !listing.petsAllowed) {
            return false;
        }

        return true;
    });

    return (
        <div className="listings-wrapper">
            <TopNavBar activeLink="Dashboard" /> 

            <main className="listings-main-content">
                <div className="listings-layout-grid">
                    {/* Filters Column */}
                    <aside className="filters-aside">
                        <div className="filters-card">
                            <h3 className="filters-title">Filters</h3>
                            
                            {/* Budget Filter (Uses dynamic data) */}
                            <div className="filter-group">
                                <label className="filter-label" htmlFor="budget">Max Price Filter</label>
                                {/* Display current filter value */}
                                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${budgetFilter}</p>
                                <input 
                                    className="budget-slider" 
                                    id="budget" 
                                    type="range" 
                                    min="500" 
                                    max="3000" 
                                    value={budgetFilter}
                                    onChange={handleBudgetChange}
                                />
                                <div className="budget-range-labels">
                                    <span>$500</span>
                                    <span>$3000+</span>
                                </div>
                            </div>

                            {/* Gender Preference Filter */}
                            <div className="filter-group">
                                <h4 className="filter-label">Gender Preference</h4>
                                <div className="gender-selector">
                                    {['Any', 'Female', 'Male'].map(gender => (
                                        <button 
                                            key={gender}
                                            className={`gender-btn ${selectedGender === gender ? 'active' : ''}`}
                                            onClick={() => handleGenderChange(gender)}
                                        >
                                            {gender}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pets Allowed Filter */}
                            <div className="filter-group">
                                <h4 className="filter-label">Pets</h4>
                                <label className="pets-checkbox-label">
                                    <input 
                                        className="pets-checkbox" 
                                        type="checkbox" 
                                        checked={petsFilter}
                                        onChange={handlePetsChange}
                                    />
                                    <span>Pets Allowed</span>
                                </label>
                            </div>

                            <button className="apply-filters-btn">
                                <span>Apply Filters ({filteredListings.length} results)</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Column */}
                    <section className="main-listings-section">
                        {/* Page Heading (Made Dynamic) */}
                        <div className="listings-header">
                            <h1 className="listings-page-title">Find Your Next Roommate, {user?.fullName || 'User'}</h1>
                            <p className="listings-page-subtitle">
                                Browse listings that match your lifestyle and preferences in San Francisco.
                            </p>
                        </div>

                        {/* Map Placeholder */}
                        <div className="map-placeholder" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDD3kZWZ72Yz1i4PgIHSIXsth2J9rbbCETjNsT0O9U1G3jj_ARE_foL_ZyiVCErSjb24HoamIn25F3BUsdzEd1fSjNL8Hu3x6qT-3jFLXyWHq14cGM4Dnu4mM9Y7XAR-CR1mW6qI1TALJnNimRQbIy1JDgCjvHwGXn6KlkjbESqv4heYEQG4y7mcY85h2OMlVrmV43mZnECbFIs9kARCGyKtmR5HOxTWdHYWw2DrgLUOWMaEhd9juv1-n_ofuaSEiE72Va3LqEevx3Y")' }}></div>

                        {/* Chips / Sorting */}
                        <div className="sorting-controls">
                            <div className="sorting-chips-left">
                                <FilterButton text="Price" />
                                <FilterButton text="Distance" />
                            </div>
                            <FilterButton text="Sort by: Newest" isSort={true} />
                        </div>

                        {/* Image Grid */}
                        <div className="listings-grid">
                            {filteredListings.length > 0 ? (
                                filteredListings.map((listing) => (
                                    <ListingCard key={listing.id} {...listing} />
                                ))
                            ) : (
                                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-gray)' }}>
                                    No listings match your current filters.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Listings;