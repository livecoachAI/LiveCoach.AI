import {View, TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'
import ButtonYellow from '@/app/components/buttonYellow';
import DropDownPicker from 'react-native-dropdown-picker';
import { Label } from '@react-navigation/elements';

const SPORTS_DATA = [
  { label: 'Cricket', value: 'cricket' },
  { label: 'Badminton', value: 'badminton' },
];

const SHOTS_DATA = {
  cricket: [
    { label: 'Cover Drive', value: 'cover_drive' },
    { label: 'Pull Shot', value: 'pull_shot' },
    { label: 'Straight Drive', value: 'straight_drive' },
  ],
  badminton: [
    { label: 'Smash', value: 'smash' },
    { label: 'Drop', value: 'drop_shot' },
    { label: 'Clear', value: 'clear' },
  ],
};

const PLAYER_DATA = [
    { label: 'Player 1', value: 'player-1' },
    { label: 'Player 2', value: 'player-2' },
    { label: 'Player 3', value: 'player-3' },
    { label: 'Player 4', value: 'player-4' },
    { label: 'Player 5', value: 'player-5' },
]

const Upload = () => {
    //State for player Dropdown
    const [openPlayer, setOpenPlayer] = useState(false);
    const [playerValue, setPlayerValue] = useState(null);
    const [player, setPlayer] = useState(PLAYER_DATA);

    // State for Sport Dropdown
    const [openSport, setOpenSport] = useState(false);
    const [sportValue, setSportValue] = useState(null);
    const [sports, setSports] = useState(SPORTS_DATA);

    // State for Shot Dropdown
    const [openShot, setOpenShot] = useState(false);
    const [shotValue, setShotValue] = useState(null);
    const [shots, setShots] = useState([]);

    // 2. Effect to update shots when sport changes
    useEffect(() => {
        if (sportValue) {
            setShots(SHOTS_DATA[sportValue]);
            setShotValue(null); // Reset shot selection when sport changes
        } else {
            setShots([]);
        }
    }, [sportValue]);

    return (
        <View className="flex-1">
            {/* Form Fields */}
            <View>
            <TextInput
                placeholder="Session title"
                placeholderTextColor="#ADABAB"
                className="bg-neutral-50 p-4 rounded-sm text-base mb-8"
            />
                
            <TextInput
                placeholder="Session Details"
                placeholderTextColor="#ADABAB"
                numberOfLines={4}
                className="bg-neutral-50 p-4 rounded-sm text-base"
            />

            <View className="z-50 my-4 w-40">
                <DropDownPicker
                open={openPlayer}
                value={playerValue}
                items={player}
                setOpen={setOpenPlayer}
                setValue={setPlayerValue}
                placeholder="Select Player"
                style={styles.dropdownBase}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.containerStyle}
                arrowIconStyle={{ tintColor: 'black' } as any}
                />
            </View>

            <View className="z-30 mb-4 w-40">
                <DropDownPicker
                open={openSport}
                value={sportValue}
                items={sports}
                setOpen={setOpenSport}
                setValue={setSportValue}
                placeholder="Select Sport"
                style={styles.dropdownBase}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.containerStyle}
                arrowIconStyle={{ tintColor: 'black' } as any}
                />
            </View>

            {/* Shot Selection (Bottom Dropdown - Disabled if no sport selected) */}
            <View className="z-10 w-40">
                <DropDownPicker
                open={openShot}
                value={shotValue}
                items={shots}
                setOpen={setOpenShot}
                setValue={setShotValue}
                disabled={!sportValue}
                placeholder={sportValue ? "Select Shot" : "Pick Sport"}
                style={[
                    styles.dropdownBase, 
                    !sportValue && { opacity: 0.5 }
                ]}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.containerStyle}
                />
            </View>
                <View className="my-8">
                    <ButtonYellow
                        title="UPLOAD VIDEO"
                    />
                </View>   
            </View>
        </View>    
    )
}

export default Upload

const styles = {
  dropdownBase: {
    backgroundColor: '#E5E7EB', // slate-200
    borderWidth: 0,
    borderRadius: 8,
    minHeight: 45,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  containerStyle: {
    borderWidth: 0,
    backgroundColor: '#E5E7EB',
  }
};