import {View, Text, Button} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const SignIn = () => {
    //const { signIn } = useSession();
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
            <Button
                title="Login (temporary)"
                onPress={() => {
                    //signIn();
                    router.push("/(screens)/(social)");
                }}
            />
        </View>
    )
}
export default SignIn
