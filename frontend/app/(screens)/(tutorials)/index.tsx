import React, {useState} from 'react';
import {View, Text, SafeAreaViewBase} from 'react-native';
import Dropdown from "../../components/Dropdown";


const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState('cricket');

  const cricketTutorial = [
    'COVER DRIVE',
    'LEG GLANCE',
    'STRAIGHT DRIVE',
    'SQUARE CUT',
    'PULL SHOT',
    'LATE CUT',
    'PADDLE SWEEP',
    'SLOG SWEEP',
  ];

  const bandmintonTutorial = [
    'SMASH',
    'CLEAR',
    'DROP',
    'NET SHOT'
  ];

  const techniques = currentStep === 'cricket' ? cricketTutorial : bandmintonTutorial;


};

export default Tutorial;
