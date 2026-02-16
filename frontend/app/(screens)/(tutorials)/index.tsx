import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewVideo from './viewVideo';
import SportOverview from './sportOverview';
import CricketDetail from './technique-detailsCricket';
import BadmintonDetail from './technique-detailsBadminton';

const Index = () => {
    // State to manage which 'screen' is visible
    const [view, setView] = useState<'overview' | 'tutorials' | 'details'>('overview');
    const [sport, setSport] = useState<'cricket' | 'badminton'>('cricket');
    const [selectedTechnique, setSelectedTechnique] = useState<string>('');

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-neutral-50">
            <View className="flex-1">
                
                {view === 'overview' && (
                    <SportOverview 
                        onNavigate={(selectedSport: 'cricket' | 'badminton') => {
                            setSport(selectedSport);
                            setView('tutorials');
                        }}
                    />
                )}

                {view === 'tutorials' && (
                    <ViewVideo 
                        activeSport={sport}
                        setSport={setSport}
                        onBack={() => setView('overview')}
                        onSelect={(technique: string) => {
                            setSelectedTechnique(technique);
                            setView('details');
                        }}
                    />
                )}

                {view === 'details' && (
                    sport === 'cricket' ? (
                        <CricketDetail 
                            techniqueName={selectedTechnique} 
                            onBack={() => setView('tutorials')} 
                        />
                    ) : (
                        <BadmintonDetail 
                            techniqueName={selectedTechnique} 
                            onBack={() => setView('tutorials')} 
                        />
                    )
                )}

            </View>
        </SafeAreaView>
    );
};

export default Index;