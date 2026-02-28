import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PrograssChart = () => {
  const router = useRouter();
  
  // Get today's actual date
  const today = new Date();
  const actualYear = today.getFullYear();
  const actualMonth = today.getMonth(); // 0-indexed
  const actualDay = today.getDate();

  const [selectedYear, setSelectedYear] = useState(actualYear);

  // Yellow "Work" days
  const [activeDates, setActiveDates] = useState<string[]>([
    `${actualYear}-1-2`, `${actualYear}-1-11`, `${actualYear}-1-16`, `${actualYear}-1-20` 
  ]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const toggleDate = (monthIndex: number, day: number) => {
    const dateString = `${selectedYear}-${monthIndex}-${day}`;
    setActiveDates(prevDates => {
      if (prevDates.includes(dateString)) {
        return prevDates.filter(d => d !== dateString); 
      }
      return [...prevDates, dateString]; 
    });
  };

  const renderCalendarDays = (monthIndex: number) => {
    const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
    const startDay = new Date(selectedYear, monthIndex, 1).getDay();

    const emptyDays = Array.from({ length: startDay }, (_, i) => `empty-${i}`);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <View className="w-full">
        {/* Weekday Headers */}
        <View className="flex-row w-full mb-1">
          {weekDays.map((wd, i) => (
            <View key={`wd-${i}`} style={{ width: '14.28%' }} className="items-center">
              <Text style={{ fontSize: 6, color: '#9CA3AF', fontWeight: 'bold' }}>{wd}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap w-full">
          {emptyDays.map((emptyKey) => (
            <View key={emptyKey} style={{ width: '14.28%', aspectRatio: 1 }} />
          ))}

          {daysArray.map((day) => {
            const dateString = `${selectedYear}-${monthIndex}-${day}`;
            const isToday = selectedYear === actualYear && monthIndex === actualMonth && day === actualDay;
            const isWorkDay = activeDates.includes(dateString);

            return (
              <TouchableOpacity 
                key={day} 
                onPress={() => toggleDate(monthIndex, day)}
                style={{ width: '14.28%', aspectRatio: 1 }}
                className="p-[1px] items-center justify-center"
              >
                <View 
                  className={`w-full h-full items-center justify-center rounded-full
                    ${isWorkDay ? 'bg-[#F8FE11]' : ''} 
                    ${isToday && !isWorkDay ? 'border border-[#FF4081]' : ''}
                  `}
                >
                  <Text 
                    style={{ 
                      fontSize: 8, 
                      fontWeight: 'bold',
                      color: isWorkDay ? '#000000' : isToday ? '#FF4081' : '#9CA3AF' 
                    }}
                  >
                    {day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header */}
      <View className="flex-row items-center px-6 py-4">
        {/* --- CRITICAL FIX: EXPLICIT ROUTING TO PROFILE --- */}
        <TouchableOpacity onPress={() => router.push("/(screens)/(profile)" as any)}>
          <ArrowLeft size={28} color="black" strokeWidth={3} />
        </TouchableOpacity>
        <Text className="ml-4 font-bebas text-3xl text-black uppercase tracking-tighter">
          PROGRESS CHART
        </Text>
      </View>

      {/* Scrollable Area */}
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
    </SafeAreaView>
  );
};

export default PrograssChart;