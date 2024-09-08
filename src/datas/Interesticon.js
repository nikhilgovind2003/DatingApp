// interestIcons.js

// Mapping of interests to their respective icons
const interestIcons = {
    travel: "✈️",
    running: "🏃‍♂️",
    swim: "🏊‍♂️",
    football: "⚽",
    music: "🎵",
    read: "📚",
    hiking: "🥾",
    cooking: "🍳",
    movie: "🎬",
    gaming: "🎲",
    // Add more as needed
  };
  
  // Function to get an icon for an interest or a default one
  export const getIconForInterest = (interest) => {
    // Convert interest to lowercase for consistency
    const lowerInterest = interest.toLowerCase();
  
    // Loop through the interestIcons to find if any key matches as a substring
    for (const key in interestIcons) {
      if (lowerInterest.includes(key)) {
        return interestIcons[key];
      }
    }
  
    // Default icon if no match
    return "⭐";
  };
  