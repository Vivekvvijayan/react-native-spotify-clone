import AsyncStorage from "@react-native-async-storage/async-storage"

export const setData = async (Token) => {
    try {
        await AsyncStorage.setItem('@access_key', Token)

    } catch (err) {
        console.log("Error in savinng token", err)
    }
}
