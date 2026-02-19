import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Data Structure 
const CRICKET_DATA: Record<string, any> = {
  'COVER DRIVE': {
    difficulty: '4/10', 
    description: 'A classic front-foot drive played with a vertical bat, where the batsman steps forward towards the pitch of the ball, leans into the line, and swings through with a high elbow and full follow-through. The ball is struck through the covers (between extra cover and point) along the ground or slightly lofted.',
    risks: 'Mistiming can result in a thick edge to the slips or gully, or playing inside the line and missing the ball entirely. The front leg can get in the way if the stride is too big.',
    whenToUse: 'Against full-length or slightly overpitched deliveries outside off stump, particularly when the off-side field is spread or the bowler is swinging the ball away. Ideal for building an innings with elegant boundaries.',
    exponents: 'Kumar Sangakkara, Virat Kohli, Mark Waugh'
  },
  'FRONT FOOT DEFENCE': {
    difficulty: '2/10',
    description: 'The classic forward defensive, played to good-length balls by stepping forward with the front foot, head over the ball, bat straight and close to the pad, presenting the full face to block the delivery. Soft hands help kill the pace.',
    risks: 'Playing too early can lead to a leading edge or bat-pad catch; too late and the ball may sneak through to the stumps. Vulnerable to late swing or seam.',
    whenToUse: 'To defend against full or good-length balls on or outside off stump from pace or spin, particularly early in the innings or against accurate bowling.',
    exponents: 'Rahul Dravid, Sunil Gavaskar, Sachin Tendulkar'
  },
  'BACK FOOT DEFENCE': {
    difficulty: '2/10',
    description: 'A solid defensive shot played off the back foot to short-of-a-length or rising deliveries. The batsman moves the back foot across towards the stumps, keeps the bat vertical and angled slightly downward, head over the ball, and presents the full face to deaden the delivery.',
    risks: 'If the bat is not straight or the hands are too high, the ball can squirt to the slips or produce a catch. Exposes the body more than the front-foot version.',
    whenToUse: 'Against pace bowlers on good to back-of-a-length deliveries pitching on or around off stump, especially when the ball is seaming or bouncing. Essential for survival in seaming conditions.',
    exponents: 'Rahul Dravid, Jacques Kallis, Alastair Cook'
  },
  'STRAIGHT DRIVE': {
    difficulty: '5/10',
    description: 'A vertical-bat drive played straight down the ground past the bowler. The batsman takes a full stride forward, keeps the bat perfectly straight through the line of the ball, and extends the arms fully in the follow-through for elegance and power.',
    risks: 'The ball can go straight back to the bowler or mid-on if slightly mistimed; requires perfect balance to avoid being caught in the V.',
    whenToUse: 'Against full-length deliveries on the stumps or just outside off, when the bowler overpitches and mid-on is vacant or deep. One of the most satisfying shots when timed perfectly.',
    exponents: 'Sachin Tendulkar, Brian Lara, Ricky Ponting'
  },
  'SQUARE CUT': {
    difficulty: '5/10',
    description: 'A horizontal-bat shot played off the back foot to short, wide deliveries outside off stump. The batsman rocks back, opens the bat face, and cuts the ball square through the point region using the bowler\'s pace.',
    risks: 'Top edge can fly to gully or third man; mistiming often leads to catches in the off-side cordon. Requires precise footwork.',
    whenToUse: 'Against short and wide balls from pace bowlers, especially when the point and gully fields are up or vacant. Great for quick boundaries in powerplays.',
    exponents: 'Brian Lara, Mahela Jayawardene, Virender Sehwag'
  },
  'FLICK': {
    difficulty: '4/10',
    description: 'A wristy leg-side shot, often played to balls on or outside leg stump. Using soft hands and strong bottom-hand wrists, the batsman flicks the ball through mid-wicket or square leg with a straight bat angled slightly to the on-side. Can be played off front or back foot.',
    risks: 'Leading edge back to the bowler or mid-on; aerial flicks can be caught in the deep.',
    whenToUse: 'Against full or good-length balls drifting onto the pads, ideal for rotating strike or picking boundaries when leg-side fielders are sparse.',
    exponents: 'Virat Kohli, Michael Hussey'
  }

};

const CricketDetail = ({ techniqueName, onBack }: any) => {
  const title = techniqueName?.toUpperCase() || 'UNKNOWN';
  
  const data = CRICKET_DATA[title] || { 
    difficulty: 'N/A', 
    description: 'Content coming soon...',
    risks: 'N/A',
    whenToUse: 'N/A',
    exponents: 'N/A'
  };

  // Reusable component for each section
  const DetailSection = ({ label, content }: { label: string, content: string }) => (
    <View className="mb-6">
      {/* labels */}
      <Text className="font-abeezee text-2xl text-primary-dark mb-1 opacity-90 mt-2">{label}</Text>
      {/* content */}
      <Text className="font-manrope text-base font-semibold text-neutral-900 leading-6 text-justify">
        {content}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="py-4 pb-4 px-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Ionicons name="arrow-back" size={28} color="#150000" />
        </TouchableOpacity>
        <Text className="font-bebas text-4xl text-primary-dark pt-1">{title}</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Difficulty Badge */}
        <View className="flex-row items-center mb-6">
          <Text className="font-bebas text-2xl text-black mr-2">DEGREE OF DIFFICULTY:</Text>
          <View className="bg-accent-yellow px-3 py-1 rounded-md">
            <Text className="font-bold font-manrope text-base">{data.difficulty}</Text>
          </View>
        </View>

        {/* Content Sec */}
        <DetailSection label="DESCRIPTION" content={data.description} />
        <DetailSection label="RISKS" content={data.risks} />
        <DetailSection label="WHEN TO USE" content={data.whenToUse} />

        {/* Best Exponents */}
        <View className="my-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <Text className="font-bebas text-xl text-primary-dark my-2">BEST EXPONENTS</Text>
          <Text className="font-manrope text-base text-neutral-900 italic">
            {data.exponents}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CricketDetail;