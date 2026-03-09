import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { publishGig, updateGig, deleteMyGig } from '../../../services/gigService'; // Import deleteMyGig
import { getAuth } from 'firebase/auth';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

type Props = {
  visible: boolean;
  onClose: () => void;
  existingGig?: any; 
};

const CreateGigModal = ({ visible, onClose, existingGig }: Props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [billingCycle, setBillingCycle] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Monthly');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sport, setSport] = useState<'Cricket' | 'Badminton'>('Cricket');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible && existingGig) {
      setName(existingGig.name || '');
      setPrice(String(existingGig.price || ''));
      setBillingCycle(existingGig.billingCycle || 'Monthly');
      setPhone(existingGig.phone || '');
      setEmail(existingGig.email || '');
      setSport(existingGig.sport || 'Cricket');
      setLocation(existingGig.location || '');
    } else if (visible && !existingGig) {
        setName(''); setPrice(''); setBillingCycle('Monthly'); setPhone(''); setEmail(''); setSport('Cricket'); setLocation('');
    }
  }, [visible, existingGig]);

  const handlePriceChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    setPrice(cleaned);
  };

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9+]/g, '');
    setPhone(cleaned);
  };

  const isFormValid = name.trim().length >= 2 && location.trim().length >= 2 && price.length > 0 && email.includes('@');

  const handleAction = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const user = getAuth().currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      const gigData = { name: name.trim(), location: location.trim(), price: parseFloat(price), billingCycle, phone: phone.trim(), email: email.trim().toLowerCase(), sport };

      const result = existingGig ? await updateGig(gigData, token) : await publishGig(gigData, token);

      if (result.success) {
        Alert.alert("Success", existingGig ? "Gig updated!" : "Gig published!");
        onClose();
      } else {
        Alert.alert("Error", result.message || "Action failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Connection lost.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NEW DELETE LOGIC ---
  const handleDelete = () => {
    Alert.alert(
      "Are you sure?", 
      "Do you really want to delete your gig? This cannot be undone.",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              const user = getAuth().currentUser;
              if (!user) return;
              const token = await user.getIdToken();
              const result = await deleteMyGig(token);
              
              if (result.success) {
                Alert.alert("Deleted", "Your gig has been removed.");
                onClose(); // This will refresh the main screen list
              } else {
                Alert.alert("Error", result.message);
              }
            } catch (e) {
              Alert.alert("Error", "Failed to delete gig.");
            }
          }
        }
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  className="flex-1 justify-end">
            <TouchableWithoutFeedback>
              
                <View className={`bg-white rounded-t-3xl p-6 border border-neutral-500 ${
                      existingGig ? 'max-h-[92%]' : 'max-h-[85%]' }`} >
                  
                  {/* TITLE SECTION WITH YELLOW UNDERLINE */}
                  
                    <Text className="font-manrope text-2xl font-bold  text-black">{existingGig ? "Edit My Gig" : "Create Coach Gig"}</Text>
                    <View className="h-1 w-12 bg-accent-yellow mb-4 rounded-full" />
                  

                  <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <Text className="font-manrope font-semibold mb-1 text-neutral-800">Full Name</Text>
                    <TextInput className="bg-primary-light p-4 rounded-xl mb-4 text-primary-dark border border-neutral-500 font-manrope" value={name} onChangeText={setName} /> */}
                    <Text className="font-manrope font-semibold mb-1 text-neutral-800">Full Name</Text>
                      <View className="flex-row items-center bg-primary-light px-4 rounded-xl border border-neutral-500 mb-4">
                        <Octicons name="person" size={20} color="#6B7280" />
                        <TextInput 
                          className="flex-1 p-4 text-primary-dark font-manrope" 
                          placeholder="Enter Your Name"
                          placeholderTextColor="#9CA3AF"
                          value={name} 
                          onChangeText={setName} 
                        />
                      </View>


                    <Text className="font-manrope font-semibold mb-1 text-neutral-800">Location</Text>
                      <View className="flex-row items-center bg-primary-light px-4 rounded-xl border border-neutral-500 mb-4">
                        <MaterialIcons name="location-on" size={20} color="#6B7280" />
                        <TextInput 
                          className="flex-1 p-4 text-primary-dark font-manrope" 
                          placeholder="Enter location"
                          placeholderTextColor="#9CA3AF"
                          value={location} 
                          onChangeText={setLocation} 
                        />
                      </View>

                    <Text className="font-manrope font-semibold mb-1 text-neutral-800">Price (LKR)</Text>
                      <View className="flex-row items-center bg-primary-light px-4 rounded-xl border border-neutral-500 mb-4">
                        <MaterialIcons name="attach-money" size={20} color="#6B7280" />
                        <TextInput 
                          className="flex-1 p-4 text-primary-dark font-manrope" 
                          placeholder="Enter price"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="decimal-pad"
                          value={price} 
                          onChangeText={handlePriceChange} 
                        />
                      </View>

                    <View className="flex-row flex-wrap gap-2 mb-4">
                        {(['Daily', 'Weekly', 'Monthly', 'Yearly'] as const).map((cycle) => (
                            <TouchableOpacity
                                key={cycle}
                                onPress={() => setBillingCycle(cycle)}
                                className={`px-4 py-2 rounded-lg border ${billingCycle === cycle ? 'bg-accent-yellow border-accent-yellow' : 'bg-white border-gray-200'}`}
                            >
                                <Text className={`font-manrope font-bold ${billingCycle === cycle ? 'text-black' : 'text-gray-500'}`}>{cycle}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text className="font-manrope font-semibold mb-1 text-neutral-800">Phone Number</Text>
                      <View className="flex-row items-center bg-primary-light px-4 rounded-xl border border-neutral-500 mb-4">
                        <MaterialIcons name="phone" size={20} color="#6B7280" />
                        <TextInput 
                          className="flex-1 p-4 text-primary-dark font-manrope" 
                          placeholder="Enter phone number"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="phone-pad"
                          value={phone} 
                          onChangeText={handlePhoneChange} 
                        />
                      </View>

                    <Text className="font-manrope font-semibold mb-1 text-neutral-800">Email Address</Text>
                      <View className="flex-row items-center bg-primary-light px-4 rounded-xl border border-neutral-500 mb-4">
                        <MaterialIcons name="email" size={20} color="#6B7280" />
                        <TextInput 
                          className="flex-1 p-4 text-primary-dark font-manrope" 
                          placeholder="Enter email address"
                          placeholderTextColor="#9CA3AF"
                          value={email} 
                          onChangeText={setEmail} 
                        />
                      </View>

                    {/* --- Sport Selection Cards --- */}
                  <Text className="font-manrope font-semibold mb-3 text-neutral-800">Select Sport</Text>
                  <View className="flex-row gap-4 mb-10 ">
                    {/* Cricket Card */}
                    <TouchableOpacity 
                      onPress={() => setSport('Cricket')}
                      className={`h-24 w-24 items-center justify-center rounded-2xl border-2 ${sport === 'Cricket' ? 'bg-accent-yellow border-accent-yellow' : 'bg-gray-100 border-transparent'}`}
                    >
                      <View className={`p-2 rounded-full mb-1 ${sport === 'Cricket' ? 'bg-black/10' : 'bg-gray-200'}`}>
                        <MaterialIcons name="sports-cricket" size={24} color={sport === 'Cricket' ? 'black' : '#6B7280'} />
                      </View>
                      <Text className={`font-manrope font-bold text-xs ${sport === 'Cricket' ? 'text-black' : 'text-gray-500'}`}>Cricket</Text>
                    </TouchableOpacity>

                    {/* Badminton Card */}
                    <TouchableOpacity 
                      onPress={() => setSport('Badminton')}
                      className={`h-24 w-24 items-center justify-center rounded-2xl border-2 ${sport === 'Badminton' ? 'bg-accent-yellow border-accent-yellow' : 'bg-gray-100 border-transparent'}`}
                    >
                      <View className={`p-2 rounded-full mb-1 ${sport === 'Badminton' ? 'bg-black/10' : 'bg-gray-200'}`}>
                        <MaterialCommunityIcons name="badminton" size={24} color={sport === 'Badminton' ? 'black' : '#6B7280'} />
                      </View>
                      <Text className={`font-manrope font-bold text-xs ${sport === 'Badminton' ? 'text-black' : 'text-gray-500'}`}>Badminton</Text>
                    </TouchableOpacity>
                  </View>

                    <TouchableOpacity 
                      disabled={!isFormValid || isSubmitting} 
                      className={`py-4 rounded-xl items-center ${isFormValid ? 'bg-accent-yellow' : 'bg-neutral-500'}`}
                      onPress={handleAction}
                    >
                      <Text className="font-manrope font-extrabold text-lg text-primary-dark">{isSubmitting ? "Processing..." : (existingGig ? "Save Changes" : "Publish Gig")}</Text>
                    </TouchableOpacity>

                    {/* --- DELETE BUTTON --- */}
                    {existingGig && (
                      <TouchableOpacity className="mt-4 py-4 rounded-xl items-center border-2 border-red-500 " onPress={handleDelete}>
                        <Text className="font-manrope font-extrabold text-lg text-red-500">Delete My Gig</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity className="mt-4 mb-10 items-center" onPress={onClose}>
                      <Text className="font-manrope text-neutral-700">Cancel</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateGigModal;