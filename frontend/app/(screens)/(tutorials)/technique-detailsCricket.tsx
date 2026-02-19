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
  },
  'PULL SHOT': {
    difficulty: '6/10',
    description: ' A horizontal-bat shot played to short balls around waist height. The batsman swivels on the back foot, pulls the bat across the body in a controlled arc, and rolls the wrists to keep the ball down, directing it to mid-wicket or square leg.',
    risks: 'op edge to deep square leg or fine leg; mistimed pulls can balloon up for easy catches.',
    whenToUse: 'Against short-pitched deliveries not too high, when the leg-side boundary is open and the bowler is predictable.',
    exponents: 'Rohit Sharma, Ricky Ponting, Viv Richards'
  },
  'HOOK SHOT': {
    difficulty: '7/10',
    description: 'An aggressive horizontal-bat shot to bouncers at or above chest height. Similar to the pull but played later and higher, the batsman hooks the ball behind square on the leg side, often aerially, using quick reflexes and strong upper body.',
    risks: 'High chance of top edge to fine leg or deep backward square; exposes the head and gloves.',
    whenToUse: 'Against short, rising deliveries from pace bowlers when the leg-side field is up and the batsman wants to dominate.',
    exponents: 'Ricky Ponting, David Warner, Brian Lara'
  },
  'RAMP' : {
    difficulty: '6/10',
    description: "A modern unorthodox shot played to short-pitched straight balls. The batsman gets inside the line, angles the bat horizontally or upward behind the wicket, and ramps the ball over the slips, wicketkeeper, or fine leg using the bowler's pace.",
    risks: ' Caught by fine leg or wicketkeeper if mistimed; requires excellent hand-eye coordination.',
    whenToUse: 'Against pace bowlers bowling short at the body when the field behind square is up, common in T20 and ODIs.',
    exponents: 'Jos Buttler, AB de Villiers, Rishabh Pant'
  },
  'SCOOP': {
    difficulty: '8/10',
    description: " An audacious shot where the batsman kneels or stays low to full or yorker-length deliveries, gets underneath the ball, and scoops it with a horizontal bat or upward flick over the wicketkeeper's head to fine leg or beyond. Variants include the Dilscoop.",
    risks: 'Very high—wicketkeeper can take a simple catch, or the batsman can be stumped or bowled if the bat misses. Defenceless against a good yorker.',
    whenToUse: 'In limited-overs cricket against pace bowlers when the field is up behind square and the batsman needs quick runs off good-length balls.',
    exponents: 'Tillakaratne Dilshan, Brendon McCullum, Jos Buttler'
  },
  'REVERSE SWEEP':{
    difficulty: '5/10',
    description: 'Using an unchanged grip and orthodox stance, a batsman swings around his front shoulder from leg to off horizontally to access the off-side.',
    risks: 'Hard to control, often aerial, exposes front leg.',
    whenToUse: 'When the leg-side perimeter is protected and the off-side field is up inside the circle, the reverse-sweep, when executed properly, penetrates the field to find the boundary from cover to third man.',
    exponents: 'Glenn Maxwell, Mike Hussey'
  },
  'Slog Sweep':{
    difficulty: '7/10',
    description: 'An aggressive, power-oriented variation of the sweep, often played aerially for big scores. The batsman adopts a similar low, kneeling position but opens up the stance more, gets the front leg out of the way, swings the bat harder with straight arms and a full, explosive follow-through from high to low to high. The focus is on getting under the ball to loft it powerfully over mid-wicket, cow corner, or deep square leg, often aiming for sixes rather than keeping it down',
    risks: 'Significantly higher aerial risk—top edge to deep backward square or mid-wicket; miscued shots can balloon up for easy catches; lbw or bowled if completely missed against fuller lengths; requires excellent timing and power, making it prone to failure under pressure.',
    whenToUse: 'Against spinners or even pace bowlers when quick boundaries or sixes are needed, the leg side is open or deep fielders are placed, and the batsman is set. Best for big overs or when the run rate demands acceleration.',
    exponents: 'Rohit Sharma, Shane Watson,  Glenn Maxwell'
  },
  'SWEEP': {
    difficulty: '5/10',
    description: 'The conventional (or hard) sweep is a defensive yet productive front-foot cross-batted shot primarily against spin bowling. The batsman gets low by kneeling on one knee (back knee often on the ground), stretches forward with the front foot, keeps the head over the ball, and sweeps the bat horizontally low across the body in a controlled arc. The ball is typically rolled along the ground or kept down towards square leg or fine leg, using soft hands and wrist control to minimize elevation.',
    risks: 'Top edge can loop up to backward square leg or short fine leg; lbw if the ball is too full and the batsman misses or gets hit on the pad; playing against sharp turn or bounce increases the chance of miscuing or edging.',
    whenToUse: "Against spinners bowling full or good-length deliveries on or around leg stump or outside off, especially on turning or slow pitches where using the feet is risky. Ideal for rotating strike, disrupting the bowler's line, or scoring safely when the leg side is under-populated.",
    exponents: 'AB de Villiers , Ross Taylor , Joe Root'
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