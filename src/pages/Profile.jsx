import React from "react";
import TopNavBar from "../components/TopNavBar";
import "../styles/Profile.css"; 
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate } from "react-router-dom"; 

// Define a default structure for safety if profile data is missing
const defaultProfile = {
    budgetMin: 0, budgetMax: 0,
    preferredLocation: 'N/A',
    sleepSchedule: 'Not set',
    cleanliness: 'Not set',
    guestPolicy: 'Not set',
    smoking: 'Not set',
    drinking: 'Not set',
    foodPreference: 'Not set',
    petFriendly: false,
    aboutMe: 'User has not yet written a bio.',
};

// Component for a single Lifestyle/Habit Card
const HabitCard = ({ icon, title, detail }) => (
  <div className="habit-card">
    <div className="habit-header">
      <div className="habit-icon-bg">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="habit-title">{title}</p>
    </div>
    <p className="habit-detail">{detail}</p>
  </div>
);

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Use user data from context, or fall back to default if profile is null
    const userData = user || {};
    const profileData = user?.profile || defaultProfile;

    const locations = profileData.preferredLocation?.split(',').map(l => l.trim()).filter(l => l.length > 0) || [];

    // --- MODIFICATION HERE: Changed icon from no_smoking_rooms to smoking_rooms ---
    const lifestyleHabits = [
        { icon: "bedtime", title: "Sleep Schedule", detail: profileData.sleepSchedule },
        { icon: "cleaning_services", title: "Cleanliness", detail: profileData.cleanliness },
        { icon: "group", title: "Guest Policy", detail: profileData.guestPolicy },
        { icon: "smoking_rooms", title: "Smoking", detail: profileData.smoking }, // <-- SIMPLE CIGARETTE ICON
        { icon: "sports_bar", title: "Drinking", detail: profileData.drinking },
        { icon: "restaurant", title: "Dietary", detail: profileData.foodPreference },
        { icon: "pets", title: "Pets", detail: profileData.petFriendly ? "Pet-Friendly" : "Not Pet-Friendly" },
    ];
    // -------------------------------------------------------------------------------
    
  return (
    <div className="profile-wrapper">
      <TopNavBar activeLink="Profile" />

      <main className="profile-main-content">
        <div className="page-header-section">
          <div className="page-header-text">
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">
              This is how your profile appears to potential roommates.
            </p>
          </div>
          <button 
              className="edit-profile-btn"
              onClick={() => navigate('/profile-setup')}
          >
            <span className="material-symbols-outlined">edit</span>
            <span className="truncate">Edit Profile</span>
          </button>
        </div>

        <div className="profile-layout-grid">
          {/* Left Column: Profile Card */}
          <aside className="profile-card-aside">
            <div className="profile-card">
              <div 
                className="profile-picture" 
                style={{ backgroundImage: `url(https://placehold.co/100x100?text=${userData.fullName?.split(' ')[0]})` }}
              ></div>
              <div className="profile-info-group">
                <p className="profile-name">
                    {userData.fullName || 'New User'}
                    {profileData.age && `, ${profileData.age}`}
                </p>
                <p className="profile-detail">{profileData.gender || 'Gender N/A'} | {profileData.occupation || 'Occupation N/A'}</p>
                <p className="profile-budget">
                    Budget: ${profileData.budgetMin} - ${profileData.budgetMax} / month
                </p>
              </div>
              
              <div className="profile-bio-group">
                  <h3 className="bio-heading">About Me</h3>
                  <p className="bio-text">{profileData.aboutMe || defaultProfile.aboutMe}</p>
              </div>
              
              <div className="profile-location-group">
                <h3 className="location-heading">Preferred Locations</h3>
                <div className="location-chips-container">
                  {locations.length > 0 ? (
                      locations.map((location) => (
                          <div key={location} className="location-chip">
                              <span className="material-symbols-outlined">location_on</span>
                              <p>{location}</p>
                          </div>
                      ))
                  ) : (
                      <p className="text-gray-500">No locations set.</p>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Lifestyle & Habits */}
          <section className="lifestyle-section">
            <h2 className="lifestyle-heading">Lifestyle & Habits</h2>
            <div className="habits-grid">
              {lifestyleHabits.map((habit) => (
                <HabitCard key={habit.title} {...habit} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;