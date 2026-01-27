import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

type CoachCardProps = {
  name: string;
  location: string;
  imageUrl: string;
};

const CoachCard = ({ name, location, imageUrl }: CoachCardProps) => {
  return (
    <View style={styles.card}>
      {/* Coach Image */}
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
      />
      
      {/* Coach Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      
      {/* Contact Button */}
      <Pressable style={styles.contactButton}>
        <Text style={styles.contactText}>Contact</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
  },
  info: {
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  contactButton: {
    backgroundColor: '#E6F20D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  contactText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
});

export default CoachCard;
