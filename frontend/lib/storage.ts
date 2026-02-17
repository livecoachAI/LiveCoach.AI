import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
    hasSeenOnboarding: "hasSeenOnboarding",
    signupRole: "signupRole",
};

export type SignupRole = "athlete" | "coach";

export async function setHasSeenOnboarding() {
    await AsyncStorage.setItem(KEYS.hasSeenOnboarding, "1");
}

export async function getHasSeenOnboarding(): Promise<boolean> {
    const value = await AsyncStorage.getItem(KEYS.hasSeenOnboarding);
    return value === "1";
}

export async function setSignupRole(role: SignupRole) {
    await AsyncStorage.setItem(KEYS.signupRole, role);
}

export async function getSignupRole(): Promise<SignupRole | null> {
    const value = await AsyncStorage.getItem(KEYS.signupRole);
    if (value === "athlete" || value === "coach") return value;
    return null;
}

export async function clearSignupRole() {
    await AsyncStorage.removeItem(KEYS.signupRole);
}
