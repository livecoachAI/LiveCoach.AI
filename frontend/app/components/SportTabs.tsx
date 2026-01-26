import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const SportTabs = () => {
  const [selectedSport, setSelectedSport] = useState('Cricket');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tab,
            selectedSport === 'Cricket' ? styles.tabSelected : styles.tabUnselected,
          ]}
          onPress={() => setSelectedSport('Cricket')}
        >
          <Text
            style={[
              styles.tabText,
              selectedSport === 'Cricket' ? styles.textSelected : styles.textUnselected,
            ]}
          >
            Cricket
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tab,
            selectedSport === 'Badminton' ? styles.tabSelected : styles.tabUnselected,
          ]}
          onPress={() => setSelectedSport('Badminton')}
        >
          <Text
            style={[
              styles.tabText,
              selectedSport === 'Badminton' ? styles.textSelected : styles.textUnselected,
            ]}
          >
            Badminton
          </Text>
        </Pressable>
      </View>

      {/* Tempory description */}
      <Text style={styles.description}>
        {selectedSport === 'Cricket'
          ? 'These are cricket coaches'
          : 'These are badminton coaches'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 25,
  },
  tabSelected: {
    backgroundColor: '#E6F20D',
  },
  tabUnselected: {
    backgroundColor: '#E5E5E5',
  },
  tabText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textSelected: {
    color: 'black',
  },
  textUnselected: {
    color: '#4B5563', // gray-600
  },
  description: {
    marginTop: 15,
    fontSize: 16,
    color: '#374151', // gray-700
  },
});

export default SportTabs;
