// --- Preference Weights (From Schema) ---
const preferenceWeights = {
    sleepSchedule: 3, 
    cleanliness: 4,      
    guestPolicy: 2,     
    petFriendly: 3,             
    smoking: 2,
    drinking: 1,
    budget: 1,           
};

// Map values to scores for match calculation (Higher score = higher preference alignment)
const preferenceScores = {
    sleepSchedule: {
        'Early Bird': 3,
        'Night Owl': 1,
        'Flexible': 2,
        '': 2, 
    },
    cleanliness: {
        'Neat Freak': 4,
        'Average': 3,
        'Messy': 1,
        '': 2,
    },
    guestPolicy: {
        'No Guests': 1,
        'Occasionally': 3,
        'Anytime': 4,
        '': 2,
    },
    petFriendly: { // Compares if both are pet-friendly, or neither are
        true: 3,
        false: 1,
    },
    smoking: {
        'Never': 4,
        'Occasionally': 2,
        'Outside Only': 3,
        'Regularly': 1,
        '': 2,
    },
    drinking: {
        'Never': 1,
        'Occasionally': 2,
        'Socially': 3,
        'Regularly': 4,
        '': 2,
    }
};

// --- Mock Roommate Profiles for Matches.jsx ---

export const mockRoommates = [
    { 
        id: 1, name: 'Sarah', age: 26, location: 'San Francisco, CA', gender: 'Female', 
        description: "Creative designer looking for a quiet and clean roommate to share a cozy space.", 
        tags: ['Clean', 'Early Bird', 'Non-Smoker'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAOAIpuqxMwl8_u2cJCCaTYyJCVD-kGPeePiakzgLGk3SJrCy8dDY8DUIKl4PJuHMr8tadsCZAPT0oKPnv_4_efCpbUn5-bcD4ike3qNGzJmiqQZKqYmsOGB1d_74-ZrFlz2zpf-16RyPrQ6hryWF8nKy9DlHzwI9tyysNAKCqkLHnQ5-3kkd6owFR72xSK7QeP8qyBHMdw8EJeeEmTBpyMAGufW6auhnrdqPa1zGMLbym-jYWWs7rzB0xyW4XAU_lFQfs6zgkSkYa',
        profile: {
            smoking: 'Never', drinking: 'Socially', foodPreference: 'Vegetarian', petFriendly: false,
            sleepSchedule: 'Early Bird', cleanliness: 'Neat Freak', guestPolicy: 'No Guests',
            budgetMin: 1500, budgetMax: 2000,
        }
    },
    { 
        id: 2, name: 'Mark', age: 29, location: 'Brooklyn, NY', gender: 'Male', 
        description: "Software engineer who enjoys hiking on weekends. Looking for a social and tidy roommate.", 
        tags: ['Night Owl', 'Social', 'Pet-Friendly'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuiXlZVGCRSLF-jZF_RhjA6FH9jnWjMXzulywpUMjBvA5miDcm-iBZVxGzebdvgR2VQMuiEfmR_sB8pCRXaJDwc0866txchUX-MxdfgTGICLwCQakGjyNF7wdd7dJRHv1ud4VKCmlqBFPRkxEydykeaLcCFckLBlRzDhTRvUzA5HgIBxZNSZ9SD00K5XfljD6cuOn_w77dIrwluaSFY7I49UHf9QwOkvJ1Xfh3OdSG8I5AvpvWcDAuUnwjFx1ESW6tb9fsDNPsHknM',
        profile: {
            smoking: 'Occasionally', drinking: 'Regularly', foodPreference: 'Non-Vegetarian', petFriendly: true,
            sleepSchedule: 'Night Owl', cleanliness: 'Average', guestPolicy: 'Anytime',
            budgetMin: 800, budgetMax: 1200,
        }
    },
    { 
        id: 3, name: 'Emily', age: 24, location: 'Austin, TX', gender: 'Female', 
        description: "Grad student who's usually at the library. Need a respectful and quiet roommate.", 
        tags: ['Quiet', 'Student', 'Clean'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2Y4f6O5jMWwIGu0WoOaGQcbuBOB1OxjpZk1rbkYZptruHRrpGI5FHMqt7mndDI_J73JiIg9b4fD0ChGdQ6XBjoLIHPtZFgywORqiFkGJkRBYo-xOhv_9HoGjlom8IgEcaI1jvi3Hk8ftQ4Qkg4xpAI5lDNiZapT_u_lCyIf_1cG1sQfsNmJZd0Wx_bevOB3FiEyEXfhIwuj2oyhG-MJ8vKjRGH3gJ6CU3l0YIcP6fDZr_UF0eMJcJ0_SYyktZ0GJDZkrnaSfjQqo',
        profile: {
            smoking: 'Never', drinking: 'Never', foodPreference: 'Vegan', petFriendly: false,
            sleepSchedule: 'Early Bird', cleanliness: 'Neat Freak', guestPolicy: 'Occasionally',
            budgetMin: 900, budgetMax: 1100,
        }
    },
];

// --- Mock Listing Data for Listings.jsx ---

export const mockListings = [
    { id: 101, title: 'Private Room in The Mission', price: 1800, details: '2 bed · 1 bath', gender: 'Any', petsAllowed: true, amenities: ['pets', 'local_laundry_service', 'wifi'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3LDGLf19Yslu6gus9ZA3Io6qmXm0iAWIovIwP2mZmSifJNbgukiaPo4ub81ksvcXXoQQDgjqG7keOczj0rnVKFhsN9VDbWQCnO0UDrPIzCwLSbsq0XC8h9gmj-jGAzcGc1MuNJfEej_8UCybiotOv_azi6Enz90aILLGA8HKJAmHkOoKbjNLBVkI-6ontGcGD8ViPQTtDDRZq23zIXJViTyYE07bC2udA-Zrx_iR44JZSnuY1EzAJ8-e7nhiCtrZ8NyBhvL9pJ52Q' },
    { id: 102, title: 'Sunny Bedroom in Hayes Valley', price: 1650, details: '3 bed · 2 bath', gender: 'Female', petsAllowed: false, amenities: ['ac_unit', 'wifi'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhbJ2W5l5IbaaAgUnAAwBmbHL7ElNGtqteKMqq3fKXAisBtAaR8WmNOm-EOPs47iivTKBrahL5wcNwNqLuCliutt2MUHKImu7flogceaYI4fHPDmuo-5gNToWc_wU-KRHn7cpnUGkNmv8jxWNdVekzs8LsjX9LiY5YBNgeVQoEVXMTo6h-QQht7MdYNaFhEhqkr33OcaIPjydaX6yicBkTJnFVAb9BwVRWYRPzrQHhq9a-MDYdWk-BnctLcgIp9hADPDFwJUUfhG7Y' },
    { id: 103, title: 'Room near Golden Gate Park', price: 1950, details: '2 bed · 2 bath', gender: 'Male', petsAllowed: false, amenities: ['local_parking', 'wifi', 'local_laundry_service'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx4sQ9gYMPP4dv6-XI3XzNjtZ9ciX7491ebarc6MVDvQBHP5SkimORfbAaSE66y31vyDsa2PoTrs1FFfnFqxefFGGLktOeuQvHspoLE0OCE8dQ8qDisMkWnaTKaIVmTi3LI-y5SEHXHcIZ6wY91cd4SsgslwKWXEt8qR6xQnP60y6CtuvLtsHxrw2Ov4jDsRkfTUcdFW8wjlthLUSfqgpyubBgS5L6pGzcy5FD6YeW0XNtQ1CxtPZ91sdsU6SNQD1ExUJFgBPH_erO' },
    { id: 104, title: 'Modern Apartment in SoMa', price: 2100, details: '1 bed · 1 bath', gender: 'Any', petsAllowed: true, amenities: ['ac_unit', 'wifi', 'pets'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv_uhsu_ApHCx8C-bNpSlbZFLdCZSAExrfwRQcTWdCwhtumiVljPHitvWKeDQ-twzmiSowkZLNTbZh_1KqvvRBwN8pn-OFIDp4vJzA0BsvxDMbKAaWY9C0EDES914f58bsm43-VQDc8wpfKUP4HDJINkzuG8gUGbH86_xCMi16N0BoK41rIQ8xYCozPbLqdqIdOEu5r5urXu8TIkb_PZ_hJRhKNVU-mEHyTKkhpiweTDhG1U-nAjhR3uQCJ9rtOppZKApXxvN29KR_' },
    { id: 105, title: 'Cozy Spot in the Marina District', price: 1700, details: '4 bed · 2 bath', gender: 'Female', petsAllowed: false, amenities: ['local_laundry_service', 'wifi'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbQ5Sp-jExzMRK7orEkhs5ctV5NCleb6NgCeUX9ELnQrTgdedg1DxxR6tVid1GY4Gzjht1Ig7rRPl3g8ZH2cyUwg-UUltWeIy2dLEFgWZwOYkovFcYoGrgSMNIbhBfMIVC2BW8BY4mYDEn69u3bbhzT79W8jTY4mMp0DCtUkB_6_yv7sntugXqMr53fQDjL1XjkfN3jT1qNb0_dichxvcC3Lko8MzDC4UoiaZfMCMpdnB-PVQqlH3_pQq0IxIoEMY9_UDW3buvdGQm' },
    { id: 106, title: 'Shared Apartment in Nob Hill', price: 1900, details: '2 bed · 1 bath', gender: 'Male', petsAllowed: false, amenities: ['local_parking', 'wifi'], imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNFXbtma52nfjSlBVDX_ZmXKdEURraztKvpyxCyG6vf3JoPSWx5je5IJqlXaNPFaER6DsZ9pxJGUmJKpPteXDM94kY1J6BPZLf2KmyGUYhrpGSz74SbOkTjNUX8chgWr71lUlvPNr0OjpwggTvD-DMixZRg9785I_IBrOO2oy6_tsM-e-cjTWMUdoRbgavlZSyvJ7A1UrXFrdPKX43Ers53d_7f9UU4UHlcebANuLOvMlS-QygXe9I7S1Ir2yFDZ1mXCZBt-B0A3wB' },
];


// --- Matching Logic Function ---

export const calculateMatchPercentage = (userProfile, matchProfile) => {
    if (!userProfile) return 50; 

    let totalScore = 0;
    let maxPossibleScore = 0;

    const lifestyleKeys = Object.keys(preferenceWeights).filter(k => k !== 'budget');
    
    for (const key of lifestyleKeys) {
        if (key === 'petFriendly') {
             const userPref = userProfile[key] === true;
             const matchPref = matchProfile.profile[key] === true;
             const weight = preferenceWeights[key];
             const score = userPref === matchPref ? 3 : 1;
             
             totalScore += score * weight;
             maxPossibleScore += 3 * weight; 

        } else if (preferenceScores[key]) {
            const userPref = userProfile[key] || '';
            const matchPref = matchProfile.profile[key] || '';
            
            const userScore = preferenceScores[key][userPref] || 2; 
            const matchScore = preferenceScores[key][matchPref] || 2; 
            const weight = preferenceWeights[key];

            const scores = Object.values(preferenceScores[key]).filter(s => s !== 2); 
            const maxDifference = scores.length > 0 ? Math.max(...scores) - Math.min(...scores) : 1;
            const actualDifference = Math.abs(userScore - matchScore);
            
            const similarityScore = Math.max(0, maxDifference - actualDifference);
            
            totalScore += similarityScore * weight;
            maxPossibleScore += maxDifference * weight;
        }
    }
    
    // Handle Budget Compatibility
    const budgetOverlap = (
        (userProfile.budgetMin <= matchProfile.profile.budgetMax) &&
        (userProfile.budgetMax >= matchProfile.profile.budgetMin)
    );
    
    const budgetWeight = preferenceWeights.budget;
    const budgetMaxScore = 1 * budgetWeight;

    if (budgetOverlap) {
        totalScore += budgetMaxScore;
    } 
    maxPossibleScore += budgetMaxScore;
    

    if (maxPossibleScore === 0) return 50;
    
    let percentage = (totalScore / maxPossibleScore) * 100;
    percentage = Math.max(50, Math.min(95, Math.round(percentage)));

    return percentage;
};


// --- Persistence Management for Messages ---

const MESSAGE_STORAGE_KEY = 'roomiefind_chat_history';

const initialChatHistory = {
    1: [ 
        { id: 1, text: "Hi Sarah! I'm interested in your listing.", sender: 'self', time: '10:20 AM' },
        { id: 2, text: "The room is still available. What's your move-in date?", sender: 'other', time: '10:25 AM' },
        { id: 3, text: "Great, I can move in next month.", sender: 'self', time: '10:30 AM' },
    ],
    2: [ 
        { id: 1, text: "Hello Mark, how do you handle chores?", sender: 'self', time: 'Yesterday' },
        { id: 2, text: "We use a rotation schedule. What about utility split?", sender: 'other', time: 'Yesterday' },
    ],
    3: [ 
        { id: 1, text: "Hi Emily. Just checking, are pets allowed in the building?", sender: 'self', time: '3 days ago' },
        { id: 2, text: "Unfortunately, the lease has a no-pets policy.", sender: 'other', time: '3 days ago' },
    ],
};

export const loadChatHistory = () => {
    try {
        const stored = localStorage.getItem(MESSAGE_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return initialChatHistory;
    } catch (e) {
        console.error("Error loading chat history:", e);
        return initialChatHistory;
    }
};

export const saveChatHistory = (history) => {
    try {
        localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
        console.error("Error saving chat history:", e);
    }
};