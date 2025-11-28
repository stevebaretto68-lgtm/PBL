import React, { useState } from 'react'; // <-- ADDED useState
import TopNavBar from '../components/TopNavBar';
import '../styles/Listings.css'; 
import { useAuth } from '../contexts/AuthContext'; 

// Mock data for listing cards (based on the HTML)
const mockListings = [
    { title: 'Private Room in The Mission', price: '$1,800/month', details: '2 bed · 1 bath', amenities: ['pets', 'local_laundry_service', 'wifi'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3LDGLf19Yslu6gus9ZA3Io6qmXm0iAWIovIwP2mZmSifJNbgukiaPo4ub81ksvcXXoQQDgjqG7keOczj0rnVKFhsN9VDbWQCnO0UDrPIzCwLSbsq0XC8h9gmj-jGAzcGc1MuNJfEej_8UCybiotOv_azi6Enz90aILLGA8HKJAmHkOoKbjNLBVkI-6ontGcGD8ViPQTtDDRZq23zIXJViTyYE07bC2udA-Zrx_iR44JZSnuY1EzAJ8-e7nhiCtrZ8NyBhvL9pJ52Q' },
    { title: 'Sunny Bedroom in Hayes Valley', price: '$1,650/month', details: '3 bed · 2 bath', amenities: ['ac_unit', 'wifi'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhbJ2W5l5IbaaAgUnAAwBmbHL7ElNGtqteKMqq3fKXAisBtAaR8WmNOm-EOPs47iivTKBrahL5wcNwNqLuCliutt2MUHKImu7flogceaYI4fHPDmuo-5gNToWc_wU-KRHn7cpnUGkNmv8jxWNdVekzs8LsjX9LiY5YBNgeVQoEVXMTo6h-QQht7MdYNaFhEhqkr33OcaIPjydaX6yicBkTJnFVAb9BwVRWYRPzrQHhq9a-MDYdWk-BnctLcgIp9hADPDFwJUUfhG7Y' },
    { title: 'Room near Golden Gate Park', price: '$1,950/month', details: '2 bed · 2 bath', amenities: ['local_parking', 'wifi', 'local_laundry_service'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx4sQ9gYMPP4dv6-XI3XzNjtZ9ciX7491ebarc6MVDvQBHP5SkimORfbAaSE66y31vyDsa2PoTrs1FFfnFqxefFGGLktOeuQvHspoLE0OCE8dQ8qDisMkWnaTKaIVmTi3LI-y5SEHXHcIZ6wY91cd4SsgslwKWXEt8qR6xQnP60y6CtuvLtsHxrw2Ov4jDsRkfTUcdFW8wjlthLUSfqgpyubBgS5L6pGzcy5FD6YeW0XNtQ1CxtPZ91sdsU6SNQD1ExUJFgBPH_erO' },
    { title: 'Modern Apartment in SoMa', price: '$2,100/month', details: '1 bed · 1 bath', amenities: ['ac_unit', 'wifi', 'pets'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv_uhsu_ApHCx8C-bNpSlbZFLdCZSAExrfwRQcTWdCwhtumiVljPHitvWKeDQ-twzmiSowkZLNTbZh_1KqvvRBwN8pn-OFIDp4vJzA0BsvxDMbKAaWY9C0EDES914f58bsm43-VQDc8wpfKUP4HDJINkzuG8gUGbH86_xCMi16N0BoK41rIQ8xYCozPbLqdqIdOEu5r5urXu8TIkb_PZ_hJRhKNVU-mEHyTKkhpiweTDhG1U-nAjhR3uQCJ9rtOppZKApXxvN29KR_' },
    { title: 'Cozy Spot in the Marina District', price: '$1,700/month', details: '4 bed · 2 bath', amenities: ['local_laundry_service', 'wifi'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbQ5Sp-jExzMRK7orEkhs5ctV5NCleb6NgCeUX9ELnQrTgdedg1DxxR6tVid1GY4Gzjht1Ig7rRPl3g8ZH2cyUwg-UUltWeIy2dLEFgWZwOYkovFcYoGrgSMNIbhBfMIVC2BW8BY4mYDEn69u3bbhzT79W8jTY4mMp0DCtUkB_6_yv7sntugXqMr53fQDjL1XjkfN3jT1qNb0_dichxvcC3Lko8MzDC4UoiaZfMCMpdnB-PVQqlH3_pQq0IxIoEMY9_UDW3buvdGQm' },
    { title: 'Shared Apartment in Nob Hill', price: '$1,900/month', details: '2 bed · 1 bath', amenities: ['local_parking', 'wifi'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNFXbtma52nfjSlBVDX_ZmXKdEURraztKvpyxCyG6vf3JoPSWx5je5IJqlXaNPFaER6DsZ9pxJGUmJKpPteXDM94kY1J6BPZLf2KmyGUYhrpGSz74SbOkTjNUX8chgWr71lUlvPNr0OjpwggTvD-DMixZRg9785I_IBrOO2oy6_tsM-e-cjTWMUdoRbgavlZSyvJ7A1UrXFrdPKX43Ers53d_7f9UU4UHlcebANuLOvMlS-QygXe9I7S1Ir2yFDZ1mXCZBt-B0A3wB' },
];

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
            <p className="listing-details">{price} · {details}</p>
            <div className="listing-amenities">
                {amenities.map(amenity => (
                    <span key={amenity} className="material-symbols-outlined" title={amenity}>{amenity}</span>
                ))}
            </div>
        </div>
    </div>
);

const Listings = () => {
    // NEW: State to manage the selected gender filter
    const [selectedGender, setSelectedGender] = useState('Any');

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
        // In a real application, you would also trigger a filter/API call here
        console.log("Gender Filter set to:", gender);
    };

    return (
        <div className="listings-wrapper">
            {/* TopNavBar is used here */}
            <TopNavBar activeLink="Listings" />

            <main className="listings-main-content">
                <div className="listings-layout-grid">
                    {/* Filters Column */}
                    <aside className="filters-aside">
                        <div className="filters-card">
                            <h3 className="filters-title">Filters</h3>
                            
                            {/* Budget Filter */}
                            <div className="filter-group">
                                <label className="filter-label" htmlFor="budget">Budget</label>
                                <input className="budget-slider" id="budget" type="range" min="500" max="3000" defaultValue="1800" />
                                <div className="budget-range-labels">
                                    <span>$500</span>
                                    <span>$3000+</span>
                                </div>
                            </div>

                            {/* Gender Preference Filter - MODIFIED */}
                            <div className="filter-group">
                                <h4 className="filter-label">Gender Preference</h4>
                                <div className="gender-selector">
                                    <button 
                                        className={`gender-btn ${selectedGender === 'Any' ? 'active' : ''}`}
                                        onClick={() => handleGenderChange('Any')}
                                    >
                                        Any
                                    </button>
                                    <button 
                                        className={`gender-btn ${selectedGender === 'Female' ? 'active' : ''}`}
                                        onClick={() => handleGenderChange('Female')}
                                    >
                                        Female
                                    </button>
                                    <button 
                                        className={`gender-btn ${selectedGender === 'Male' ? 'active' : ''}`}
                                        onClick={() => handleGenderChange('Male')}
                                    >
                                        Male
                                    </button>
                                </div>
                            </div>

                            {/* Pets Allowed Filter */}
                            <div className="filter-group">
                                <h4 className="filter-label">Pets</h4>
                                <label className="pets-checkbox-label">
                                    <input className="pets-checkbox" type="checkbox" />
                                    <span>Pets Allowed</span>
                                </label>
                            </div>

                            <button className="apply-filters-btn">
                                <span>Apply Filters</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Column */}
                    <section className="main-listings-section">
                        {/* Page Heading */}
                        <div className="listings-header">
                            <h1 className="listings-page-title">Find Your Next Roommate</h1>
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
                            {mockListings.map((listing, index) => (
                                <ListingCard key={index} {...listing} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Listings;