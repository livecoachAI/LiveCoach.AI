import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadSection() {

    const [modalVisible, setModalVisible] = useState(false);

    const handlePickDocument = async () => {
        setModalVisible(false); // Close popup
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        });

        if (!result.canceled) {
            console.log("File picked:", result.assets[0].name);
        }
    };

    const handlePickImage = async (useCamera: boolean) => {
        setModalVisible(false); // Close popup
        const permissionResult = useCamera
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", `You need to allow access to your ${useCamera ? 'camera' : 'photos'}.`);
            return;
        }

        const result = useCamera
            ? await ImagePicker.launchCameraAsync({ quality: 1 })
            : await ImagePicker.launchImageLibraryAsync({ quality: 1 });

        if (!result.canceled) {
            console.log("Image picked:", result.assets[0].uri);
        }
    };

    return (
        <View className="p-4">
            <Text className="font-bebas text-2xl mb-4 uppercase text-neutral-800">
                Upload Certificates
            </Text>

            <Pressable
                onPress={() => setModalVisible(true)}
                className="w-full bg-neutral-300 rounded-[30px] py-12 items-center justify-center active:opacity-80"
            >
                <Feather name="upload" size={60} color="#888" />
                <Text className="text-neutral-500 font-bold mt-4 tracking-widest uppercase">
                    Upload Files
                </Text>
            </Pressable>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {/*Backdrop */}
                <Pressable
                    className="flex-1 justify-end bg-black/40"
                    onPress={() => setModalVisible(false)}
                >
                    {/*Content*/}
                    <TouchableWithoutFeedback>
                        <View className="bg-white rounded-t-[30px] p-6 pb-10">
                            <Text className="font-bebas text-xl mb-4 text-center text-neutral-800">Choose Source</Text>

                            <Pressable
                                onPress={() => handlePickImage(true)}
                                className="flex-row items-center p-4 border-b border-neutral-100"
                            >
                                <Feather name="camera" size={24} color="#444" />
                                <Text className="ml-4 text-lg font-semibold">Camera</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => handlePickImage(false)}
                                className="flex-row items-center p-4 border-b border-neutral-100"
                            >
                                <Feather name="image" size={24} color="#444" />
                                <Text className="ml-4 text-lg font-semibold">Photo Gallery</Text>
                            </Pressable>

                            <Pressable
                                onPress={handlePickDocument}
                                className="flex-row items-center p-4"
                            >
                                <Feather name="file" size={24} color="#444" />
                                <Text className="ml-4 text-lg font-semibold">File Browser</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setModalVisible(false)}
                                className="mt-4 p-4 bg-neutral-100 rounded-xl"
                            >
                                <Text className="text-center text-neutral-600 font-bold">CANCEL</Text>
                            </Pressable>
                        </View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </Modal>
        </View>
    );
}