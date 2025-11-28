import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ProfileSetup.css'; 

const ProfileSetup = () => {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();
    const existingProfile = user?.profile || {};

    // Initialize state with all fields from the new schema
    const [formData, setFormData] = useState({
        // Personal Details
        phone: existingProfile.phone || '',
        gender: existingProfile.gender || '',
        age: existingProfile.age || '',
        occupation: existingProfile.occupation || '',
        aboutMe: existingProfile.aboutMe || '',

        // Lifestyle & Habits
        smoking: existingProfile.smoking || 'Never',
        drinking: existingProfile.drinking || 'Never',
        foodPreference: existingProfile.foodPreference || 'Non-Vegetarian',
        petFriendly: existingProfile.petFriendly || false,
        sleepSchedule: existingProfile.sleepSchedule || 'Flexible',
        cleanliness: existingProfile.cleanliness || 'Average',
        guestPolicy: existingProfile.guestPolicy || 'Occasionally',

        // Housing Preferences
        budgetMin: existingProfile.budgetMin || 800,
        budgetMax: existingProfile.budgetMax || 1200,
        preferredLocation: existingProfile.preferredLocation || '',
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Save data to the global context (and localStorage)
        updateProfile(formData);
        
        console.log("Saving profile data:", formData);
        
        // 2. REDIRECT: Go back to the viewing profile page or dashboard if initial setup
        const redirectPath = existingProfile.isOnboardingComplete ? '/profile' : '/dashboard';
        navigate(redirectPath);
    };

    const isEditing = user?.profile?.isOnboardingComplete;

    return (
        <div className="profile-setup-wrapper">
            <TopNavBar activeLink="Profile" /> 
            <main className="setup-main-content">
                <div className="setup-card">
                    <h1 className="setup-title">{isEditing ? "Edit Your Profile ✏️" : "Complete Your Profile 🏡"}</h1>
                    <p className="setup-subtitle">
                        {isEditing 
                            ? "Update your preferences and lifestyle habits below." 
                            : "Tell us about your lifestyle to find your perfect roommate match."}
                    </p>

                    <form onSubmit={handleSubmit} className="setup-form-grid">
                        <h2 className="section-title span-full">Personal Details</h2>
                        
                        {/* Phone */}
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Optional" />
                        </div>
                        
                        {/* Age */}
                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g., 25" />
                        </div>
                        
                        {/* Gender */}
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Occupation */}
                        <div className="form-group">
                            <label>Occupation</label>
                            <select name="occupation" value={formData.occupation} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="Student">Student</option>
                                <option value="Professional">Professional</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* About Me */}
                        <div className="form-group span-full">
                            <label>About Me (Short Bio - max 500 chars)</label>
                            <textarea 
                                name="aboutMe" 
                                value={formData.aboutMe} 
                                onChange={handleChange} 
                                placeholder="Tell roommates a bit about yourself..." 
                                maxLength="500" 
                                rows="3"
                            />
                        </div>

                        <h2 className="section-title span-full">Lifestyle & Habits</h2>
                        
                        {/* Sleep Schedule */}
                        <div className="form-group">
                            <label>Sleep Schedule</label>
                            <select name="sleepSchedule" value={formData.sleepSchedule} onChange={handleChange} required>
                                <option value="Flexible">Flexible</option>
                                <option value="Early Bird">Early Bird</option>
                                <option value="Night Owl">Night Owl</option>
                            </select>
                        </div>
                        
                        {/* Cleanliness */}
                        <div className="form-group">
                            <label>Cleanliness</label>
                            <select name="cleanliness" value={formData.cleanliness} onChange={handleChange} required>
                                <option value="Average">Average</option>
                                <option value="Neat Freak">Neat Freak</option>
                                <option value="Messy">Messy</option>
                            </select>
                        </div>

                        {/* Smoking */}
                        <div className="form-group">
                            <label>Smoking</label>
                            <select name="smoking" value={formData.smoking} onChange={handleChange}>
                                <option value="Never">Never</option>
                                <option value="Occasionally">Occasionally</option>
                                <option value="Regularly">Regularly</option>
                                <option value="Outside Only">Outside Only</option>
                            </select>
                        </div>

                        {/* Drinking */}
                        <div className="form-group">
                            <label>Drinking</label>
                            <select name="drinking" value={formData.drinking} onChange={handleChange}>
                                <option value="Never">Never</option>
                                <option value="Occasionally">Occasionally</option>
                                <option value="Socially">Socially</option>
                                <option value="Regularly">Regularly</option>
                            </select>
                        </div>

                        {/* Food Preference */}
                        <div className="form-group">
                            <label>Food Preference</label>
                            <select name="foodPreference" value={formData.foodPreference} onChange={handleChange}>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Eggetarian">Eggetarian</option>
                            </select>
                        </div>
                        
                        {/* Guest Policy */}
                        <div className="form-group">
                            <label>Guest Policy</label>
                            <select name="guestPolicy" value={formData.guestPolicy} onChange={handleChange} required>
                                <option value="Occasionally">Occasionally</option>
                                <option value="No Guests">No Guests</option>
                                <option value="Anytime">Anytime</option>
                            </select>
                        </div>

                        {/* Pet Friendly Checkbox */}
                        <div className="form-group span-full">
                            <label className="checkbox-label-inline">
                                <input type="checkbox" name="petFriendly" checked={formData.petFriendly} onChange={handleChange} />
                                I am pet-friendly / Open to living with pets.
                            </label>
                        </div>
                        
                        <h2 className="section-title span-full">Housing Preferences</h2>
                        
                        {/* Budget Range */}
                        <div className="form-group span-full">
                            <label>Monthly Budget</label>
                            <div className="budget-inputs">
                                <input type="number" name="budgetMin" value={formData.budgetMin} onChange={handleChange} placeholder="Min Budget" required />
                                <input type="number" name="budgetMax" value={formData.budgetMax} onChange={handleChange} placeholder="Max Budget" required />
                            </div>
                        </div>

                        {/* Preferred Locations */}
                        <div className="form-group span-full">
                            <label>Preferred Locations (Comma separated list)</label>
                            <input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="e.g., Williamsburg, Greenpoint" required />
                        </div>

                        <button type="submit" className="submit-btn span-full">
                            {isEditing ? "Save Changes" : "Save & Find Matches"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ProfileSetup;