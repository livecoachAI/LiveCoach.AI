import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ButtonBlack from "@/app/components/buttonBlack";
import { router, useRouter } from "expo-router";
import { useRequireSignupRole } from "@/app/hooks/useRequireSignupRole";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { api, authHeaders } from "@/lib/api";
import { clearSignupRole } from "@/lib/storage";
import { Picker } from "@react-native-picker/picker";
import PasswordInput from "../components/PasswordInput";

type ExperienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "professional";

const CreateAccount = () => {
  const router = useRouter();

  // Hook returns boolean
  const loadingRole = useRequireSignupRole("athlete");

  // all hooks BEFORE any return
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const SPORT_OPTIONS = ["Badminton", "Cricket"] as const;
  const [sports, setSports] = useState<string[]>([]);

  const toggleSport = (sport: string) => {
    setSports((prev) => {
      const exists = prev.includes(sport);
      const next = exists ? prev.filter((s) => s !== sport) : [...prev, sport];
      return next;
    });
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",

    // athlete fields
    age: "",
    experienceLevel: "intermediate" as ExperienceLevel,
  });

  const emailRegex = useMemo(() => /\S+@\S+\.\S+/, []);
  const passwordRegex = useMemo(
    () => /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
    [],
  );

  const isFormValid = () => {
    const ageNum = Number(formData.age);
    const validAge = Number.isInteger(ageNum) && ageNum >= 5 && ageNum <= 120;

    const { firstName, lastName, email, password, experienceLevel } = formData;

    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      validAge &&
      sports.length > 0 && // must select at least one sport
      ["beginner", "intermediate", "advanced", "professional"].includes(
        experienceLevel,
      ) &&
      isChecked
    );
  };

  const handleCreateAccount = async () => {
    if (loading) return; // prevent double submit

    if (!isFormValid()) {
      Alert.alert(
        "Invalid Form",
        "Please ensure all fields are correct, select at least one sport, and agree to the terms.",
      );
      return;
    }

    setLoading(true);
    try {
      // "Badminton" OR "Cricket" OR "Badminton,Cricket"
      const sportString = [...sports].sort().join(",");

      // 1) Firebase create user
      const cred = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password,
      );
      await updateProfile(cred.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // 2) Get Firebase ID token
      const token = await cred.user.getIdToken(true);

      // 3) Backend: register user (Mongo)
      await api.post(
        "/api/auth/register",
        {
          firebaseUid: cred.user.uid,
          email: formData.email.trim(),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          role: "athlete",
          authProvider: "email",
          athleteData: {
            sport: sportString, // now matches selection
            age: Number(formData.age),
            experienceLevel: formData.experienceLevel,
            bio: "",
            goals: [], // optional but safe
          },
        },
        { headers: await authHeaders(token) },
      );

      // 4) Backend: complete onboarding
      await api.post(
        "/api/auth/complete-onboarding",
        { role: "athlete" },
        { headers: await authHeaders(token) },
      );

      // 5) Clear temporary signup role + go to app
      await clearSignupRole();
      router.replace("/(screens)/(profile)");
    } catch (e: any) {
      console.log("SIGNUP FAILED", {
        message: e?.message,
        status: e?.response?.status,
        data: e?.response?.data,
      });
      Alert.alert(
        "Sign up failed",
        e?.response?.data?.message || e?.message || "Unknown error",
      );
    } finally {
      setLoading(false);
    }
  };

  // Safe return after hooks
  if (loadingRole) return null;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- HEADER SECTION --- */}
        <View className="bg-accent-yellow w-full h-80 relative overflow-hidden pt-14 pb-8 px-6">
          {/* Background Watermark "JOIN" */}
          <View className="absolute right-0 top-48 opacity-10 overflow-hidden pointer-events-none">
            <Text className="text-[115px] font-bebas font-bold text-primary-dark leading-none tracking-tighter">
              JOIN
            </Text>
          </View>

          {/* Logo Placeholder */}
          <View className=" mb-20">
            <Image
              source={require("../../assets/createAccount/livecoachai-black.png")}
              className="w-[221px] h-[199px] left-[-31px] top-[-73px] absolute"
              resizeMode="contain"
            />
          </View>

          {/* Heading Text */}
          <View className="w-full h-full flex-col  justify-start items-start gap-2 mt-10 ml-2">
            <Text className="font-bebas text-primary-dark uppercase tracking-tight mb-2">
              Create Account
            </Text>
            <Text className="text-zinc-800 text-sm font-semibold leading-5">
              Get personalized coaching guidance{"\n"}powered by AI.
            </Text>
          </View>
        </View>

        {/* --- FORM SECTION --- */}
        <View className="bg-white rounded-t-[30px] pt-10 px-6 flex-1 shadow-sm z-20">
          <View className="gap-y-4">
            {/* First Name */}
            <View className="bg-gray-100 rounded-lg px-4 py-4">
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#D6D5D5"
                className="text-base text-primary-dark font-medium"
                onChangeText={(val) =>
                  setFormData({ ...formData, firstName: val })
                }
              />
            </View>

            {/* Last Name */}
            <View className="bg-gray-100 rounded-lg px-4 py-4">
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#D6D5D5"
                className="text-base text-primary-dark font-medium"
                onChangeText={(val) =>
                  setFormData({ ...formData, lastName: val })
                }
              />
            </View>

            {/*AGE*/}
            <View className="bg-gray-100 rounded-lg px-4 py-4">
              <TextInput
                placeholder="Age"
                placeholderTextColor="#D6D5D5"
                keyboardType="number-pad"
                className="text-base text-primary-dark font-medium"
                value={formData.age}
                onChangeText={(val) =>
                  setFormData({ ...formData, age: val.replace(/[^0-9]/g, "") })
                }
              />
            </View>

            <Text className="text-sm text-neutral-700 mb-2 ml-1">Sport(s)</Text>

            <View className="bg-gray-100 rounded-lg px-4 py-4">
              {SPORT_OPTIONS.map((sport) => {
                const selected = sports.includes(sport);
                return (
                  <TouchableOpacity
                    key={sport}
                    onPress={() => toggleSport(sport)}
                    className="flex-row items-center justify-between py-3"
                  >
                    <Text className="text-base text-primary-dark font-medium">
                      {sport}
                    </Text>
                    <View
                      className={`w-6 h-6 rounded border items-center justify-center ${
                        selected
                          ? "bg-primary-dark border-primary-dark"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {selected && (
                        <Feather name="check" size={16} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="bg-gray-100 rounded-lg overflow-hidden">
              <Text className="text-sm text-neutral-700 mt-3 ml-4 mb-1">
                Experience Level
              </Text>
              <Picker
                selectedValue={formData.experienceLevel}
                onValueChange={(val) =>
                  setFormData({
                    ...formData,
                    experienceLevel: val as ExperienceLevel,
                  })
                }
              >
                <Picker.Item label="Beginner" value="beginner" />
                <Picker.Item label="Intermediate" value="intermediate" />
                <Picker.Item label="Advanced" value="advanced" />
                <Picker.Item label="Professional" value="professional" />
              </Picker>
            </View>

            <Text className="text-xs text-neutral-500 mt-2 ml-1">
              Select one or both. (Badminton / Cricket)
            </Text>

            {/* Email */}
            <View className="bg-gray-100 rounded-lg px-4 py-4">
              <TextInput
                placeholder="Email"
                placeholderTextColor="#D6D5D5"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-base text-primary-dark font-medium"
                onChangeText={(val) => setFormData({ ...formData, email: val })}
              />
            </View>

            {/* Password */}
            <PasswordInput
              value={formData.password}
              onChangeText={(val) =>
                setFormData({ ...formData, password: val })
              }
              placeholder="Password"
            />
          </View>

          <Text className="text-sm text-neutral-700 mt-2 mb-6 ml-1 leading-4">
            Password must be at least 8 character long and include 1 capital
            letter and 1 symbol
          </Text>

          {/* Terms Checkbox */}
          <View className="flex-row items-start mb-8">
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              className={`w-6 h-6 rounded border items-center justify-center mr-3 mt-0.5 ${isChecked ? "bg-primary-dark border-primary-dark" : "bg-white border-gray-300"}`}
            >
              {isChecked && <Feather name="check" size={16} color="white" />}
            </TouchableOpacity>
            <Text className="flex-1 text-sm text-neutral-700">
              I agree to the{" "}
              <Text className="text-primary-dark font-bold underline">
                Terms
              </Text>{" "}
              and{" "}
              <Text className="text-black font-bold underline">
                Privacy Policy
              </Text>
            </Text>
          </View>

          {/* Submit Button */}
          <View>
            <ButtonBlack
              title={loading ? "PLEASE WAIT..." : "CREATE ACCOUNT"}
              onPress={handleCreateAccount}
            />
          </View>

          <Text className="text-center text-sm text-neutral-700 px-6 pb-8 leading-5 mt-6">
            Your stats stay protected and are only used to enhance your
            coaching.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default CreateAccount;
