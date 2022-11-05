import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Pressable,
    ImageStore,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Images } from "../constants/imgages";
import { COLORS, FONT } from "../constants/style";
import { useAuthRequest, ResponseType } from 'expo-auth-session'
import { authConfig } from "../constants/AUTH";
import { setData } from "../utils/store";


import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = ({ navigation }) => {

    const discovery = {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        // tokenEndpoint: "https://accounts.spotify.com/api/token",
    };


    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: authConfig.clientId,
            clientSecret: authConfig.clientSecret,
            scopes: authConfig.scopes,
            usePKCE: true,
            redirectUri: authConfig.redirectUri
        },

        discovery
    )

    useEffect(() => {

        if (response?.type === 'success') {
            
            const { access_token } = response.params

            AsyncStorage.setItem('access_token', access_token)
            navigation.navigate('Home')
        }

    }, [response])


    return (
        <View style={styles.container}>
            <Image source={Images.Icon} resizeMode="contain" style={styles.Logo} />

            <Pressable
                style={styles.loginBtn}
                android_ripple={{ color: COLORS.gray }}
                onPress={() => promptAsync()}
            >
                <Text style={{ color: COLORS.white, fontSize: FONT.fontNormal }}>
                    Login with Spotify
                </Text>
            </Pressable>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: "center",
        alignItems: "center",

    },
    Logo: {
        width: 250,
        height: 250,
    },
    loginBtn: {
        width: 200,
        height: 50,
        backgroundColor: COLORS.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
});
