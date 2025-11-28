import React from "react";
import TopNavBar from "../components/TopNavBar";
import "../styles/Profile.css"; 
import { useAuth } from '../contexts/AuthContext'; 

// Data structure for the Profile Card
const profileData = {
  name: "Jane D.",
  budget: "$800 - $1200 / month",
  preferredLocations: ["Williamsburg", "Greenpoint", "Bushwick"],
  imageUrl: "https://i.ibb.co/L6V2r4p/jane-d.png", 
  lifestyle: [
    { icon: "bedtime", title: "Sleeping Schedule", detail: "Early Bird" },
    { icon: "cleaning_services", title: "Cleanliness", detail: "Very Tidy" },
    { icon: "group", title: "Social Habits", detail: "Guests Occasionally" },
    { icon: "restaurant", title: "Dietary Habits", detail: "Omnivore" },
    { icon: "smoking_rooms", title: "Smoking & Drinking", detail: "Non-Smoker, Social Drinker" },
    { icon: "pets", title: "Pets", detail: "No Pets" },
  ],
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
    // Use useAuth to display actual user data later
    const { user } = useAuth();
    
  return (
    <div className="profile-wrapper">
      <TopNavBar activeLink="My Profile" />

      <main className="profile-main-content">
        <div className="page-header-section">
          <div className="page-header-text">
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">
              This is how your profile appears to potential roommates.
            </p>
          </div>
          <button className="edit-profile-btn">
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
                style={{ backgroundImage: `url(${profileData.imageUrl})` }}
              ></div>
              <div className="profile-info-group">
                <p className="profile-name">{user?.fullName || profileData.name}</p>
                <p className="profile-budget">{profileData.budget}</p>
              </div>
              <div className="profile-location-group">
                <h3 className="location-heading">Preferred Locations</h3>
                <div className="location-chips-container">
                  {profileData.preferredLocations.map((location) => (
                    <div key={location} className="location-chip">
                      <span className="material-symbols-outlined">location_on</span>
                      <p>{location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Lifestyle & Habits */}
          <section className="lifestyle-section">
            <h2 className="lifestyle-heading">Lifestyle & Habits</h2>
            <div className="habits-grid">
              {profileData.lifestyle.map((habit) => (
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