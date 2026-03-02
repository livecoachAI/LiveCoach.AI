import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from "axios";
import { auth } from "../../../lib/firebase"; 

const BASE = process.env.EXPO_PUBLIC_API_BASE_URL;

interface ProgressResponse {
  success: boolean;
  dates: string[];
}

async function authConfig() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");
  const idToken = await user.getIdToken();
  return {
    headers: { Authorization: `Bearer ${idToken}` },
  };
}

async function getSessionDates(athleteId: string) {
  const config = await authConfig();
  // Ensure this URL matches your progress.routes.js registration!
  const res = await axios.get(`${BASE}/api/sessions/dates/${athleteId}`, config);
  return res.data;
}

const PrograssChart = () => {
  const router = useRouter();
  const { athleteId } = useLocalSearchParams(); 
  
  const today = new Date();
  const actualYear = today.getFullYear();
  const actualMonth = today.getMonth(); 
  const actualDay = today.getDate();

  const [selectedYear, setSelectedYear] = useState(actualYear);
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Fetch data from MONGODB
useEffect(() => {
    async function loadData() {
      if (!athleteId) {
        setLoading(false);
        return;
      }
      try {
        const result = await getSessionDates(athleteId as string);
        if (result.success && result.dates) {
          const formatted = result.dates.map((iso: string) => {
            const d = new Date(iso);
            // Format YYYY-MonthIndex-Day
            return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
          });
          setActiveDates(formatted);
        }
      } catch (err) {
        console.error("Progress Chart Load Error:", err);
      } finally {
        setLoading(false); //To always show calendar, even if fetch fails
      }
    }
    loadData();
  }, [athleteId]);

// --- RENDER LOGIC ---
if (loading) {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <ActivityIndicator size="large" color="#FF4081" />
    </SafeAreaView>
  );
}

  const renderCalendarDays = (monthIndex: number) => {
    const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
    const startDay = new Date(selectedYear, monthIndex, 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <View className="flex-row flex-wrap w-full">
        {Array.from({ length: startDay }).map((_, i) => (
          <View key={`empty-${i}`} style={{ width: '14.28%', aspectRatio: 1 }} />
        ))}

        {daysArray.map((day) => {
          const dateString = `${selectedYear}-${monthIndex}-${day}`;
          const isWorkDay = activeDates.includes(dateString);
          
          // 3. TODAY OUTLINE LOGIC
          const isToday = day === actualDay && monthIndex === actualMonth && selectedYear === actualYear;

          return (
            <View key={day} style={{ width: '14.28%', aspectRatio: 1 }} className="p-[1px] items-center justify-center">
              <View 
                className={`w-full h-full items-center justify-center rounded-full 
                  ${isWorkDay ? 'bg-[#F8FE11]' : ''} 
                  ${isToday ? 'border border-[#FF4081]' : ''}`} // Pink outline for today
              >
                <Text 
                  style={{ 
                    fontSize: 8, 
                    fontWeight: 'bold', 
                    color: isWorkDay ? '#000000' : (isToday ? '#FF4081' : '#9CA3AF') 
                  }}
                >
                  {day}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.push("/(screens)/(profile)" as any)}>
          <ArrowLeft size={28} color="black" strokeWidth={3} />
        </TouchableOpacity>
        <Text className="ml-4 font-bebas text-3xl text-black uppercase tracking-tighter">
          PROGRESS CHART
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF4081" />
        </View>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="px-4"
          maximumZoomScale={3} 
          minimumZoomScale={1}
          bouncesZoom={true}
        >
          {/* YEAR NAVIGATION */}
          <View className="flex-row items-center justify-center mt-2 mb-6">
            <TouchableOpacity onPress={() => setSelectedYear(y => y - 1)} className="p-2 active:opacity-50">
              <ChevronLeft size={32} color="#FF4081" strokeWidth={3} />
            </TouchableOpacity>
            
            <Text className="mx-6 font-bebas text-7xl text-[#FF4081]">
              {selectedYear}
            </Text>
            
            <TouchableOpacity onPress={() => setSelectedYear(y => y + 1)} className="p-2 active:opacity-50">
              <ChevronRight size={32} color="#FF4081" strokeWidth={3} />
            </TouchableOpacity>
          </View>

          {/* 12-Month Grid */}
          <View className="flex-row flex-wrap justify-between">
            {months.map((monthName, index) => {
              const isCurrentMonth = selectedYear === actualYear && index === actualMonth;
              return (
                <View 
                  key={monthName} 
                  className="w-[31%] bg-white rounded-2xl p-1.5 mb-4 shadow-sm border border-neutral-100"
                  style={{ elevation: 3 }}
                >
                  <Text 
                    className={`text-center font-bold text-[10px] mb-1.5 
                      ${isCurrentMonth ? 'text-[#FF4081]' : 'text-black'}
                    `}
                  >
                    {monthName}
                  </Text>
                  {renderCalendarDays(index)}
                </View>
              );
            })}
          </View>
          <View className="h-20" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default PrograssChart;