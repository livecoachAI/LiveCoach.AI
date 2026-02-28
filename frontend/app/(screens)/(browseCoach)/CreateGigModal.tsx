import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { publishGig } from '../../../services/gigService';
import { getAuth } from 'firebase/auth';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const CreateGigModal = ({ visible, onClose }: Props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sport, setSport] = useState<'Cricket' | 'Badminton'>('Cricket');
  const [location, setLocation] = useState('');

  const handlePublish = async () => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            Alert.alert("Error", "You must be logged in to post a gig.");
            return;
        }

        // 2. Get the real Firebase Identity Token
        const token = await user.getIdToken();

        const numericPrice = parseFloat(price);
        const gigData = { name, location, price: numericPrice, billingCycle, phone, email, sport };

        // 3. Pass the REAL token to your service
        const result = await publishGig(gigData, token);

        if (result.success) {
            Alert.alert("Success", "Gig published under your account!");
            onClose();
        } else {
            Alert.alert("Error", result.message);
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to authenticate.");
    }
};


  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
        {/* OUTSIDE AREA */}
      <TouchableWithoutFeedback onPress={onClose}>
      <View className="flex-1 bg-black/50 justify-end">
      {/* STOP closing when pressing card */}
      <TouchableWithoutFeedback>
        <View className="bg-white rounded-t-3xl p-6 h-[80%]">
          <Text className="text-2xl font-bold mb-6">Create Coach Gig</Text>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* NAME INPUT */}
            <Text className="font-semibold mb-1 text-gray-700">Full Name</Text>
            <TextInput 
              className="bg-gray-100 p-4 rounded-xl mb-4"
              placeholder="e.g. John Doe"
              value={name}
              onChangeText={setName}
            />

            {/* LOCATION INPUT */}
<Text className="font-semibold mb-1 text-gray-700">Location</Text>
<TextInput
  className="bg-gray-100 p-4 rounded-xl mb-4"
  placeholder="e.g. Colombo"
  value={location}
  onChangeText={setLocation}
/>

            {/* PRICE & BILLING CYCLE */}
<Text className="font-semibold mb-1 text-gray-700">Price (USD)</Text>

<View className="flex-row gap-2 mb-4">
  {/* Price input */}
  <TextInput
    className="bg-gray-100 p-4 rounded-xl flex-1"
    placeholder="e.g. 50"
    keyboardType="numeric"
    value={price}
    onChangeText={setPrice}
  />

  {/* Segmented Control */}
  <View className="flex-row bg-gray-100 rounded-xl p-1 overflow-hidden">
    {(['Monthly', 'Yearly'] as const).map((cycle) => {
      const active = billingCycle === cycle;

      return (
        <TouchableOpacity
          key={cycle}
          onPress={() => setBillingCycle(cycle)}
          className={`px-4 py-3 rounded-lg justify-center ${
            active ? 'bg-accent-yellow' : 'bg-transparent'
          }`}
          style={{ minWidth: 70, alignItems: 'center' }}
          activeOpacity={0.8}
        >
          <Text className={`${active ? 'font-semi bold text-black' : 'text-gray-500'}`}>
            {cycle}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
</View>

            {/* CONTACT INFO */}
            <Text className="font-semibold mb-1 text-gray-700">Phone Number</Text>
            <TextInput 
              className="bg-gray-100 p-4 rounded-xl mb-4"
              placeholder="+94 77 123 4567"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text className="font-semibold mb-1 text-gray-700">Email Address</Text>
            <TextInput 
              className="bg-gray-100 p-4 rounded-xl mb-4"
              placeholder="coach@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text className="font-semibold mb-3 text-gray-700">Select Sport</Text>
            <View className="flex-row gap-2 mb-20">
              {['Cricket', 'Badminton'].map((s) => (
                <TouchableOpacity 
                  key={s}
                  onPress={() => setSport(s as any)}
                  className={`px-6 py-2 rounded-full ${sport === s ? 'bg-accent-yellow' : 'bg-gray-200'}`}
                >
                  <Text>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              className="bg-accent-yellow py-4 rounded-xl items-center"
              onPress={handlePublish}
            >
              <Text className="font-bold text-lg">Publish Gig</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4 items-center" onPress={onClose}>
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        </TouchableWithoutFeedback>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateGigModal;