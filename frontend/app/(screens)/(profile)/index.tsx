import React from 'react';
// Import the Profile component from its file path
import Profile from './profile'; 
import { View, SafeAreaView, Text } from 'react-native';

// Define the data here or fetch it from an API
const dummyAthlete = {
  name: "JOHN DOE",
  role: "Athlete",
  profileImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067",
  sections: [
    { title: "SESSIONS" },
    { title: "PROGRESS CHART" }
  ]
};

const TestScreen = () => {
  return (
    // Pass the dummy data to the Profile component via the athleteData prop
      <View className="flex-1">
          <View className="flex-1">
              <Profile/>
          </View>     
      </View>
  );
};

export default TestScreen;

<Profile athleteData={dummyAthlete} />