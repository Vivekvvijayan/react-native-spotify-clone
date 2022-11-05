import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useLayoutEffect, useReducer } from 'react'
import { COLORS, FONT } from '../constants/style'
import { Images } from '../constants/imgages'
import reducer, { initialState } from '../reducer/reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SpotifyContext } from '../context/SpotifyContext'


const Settings = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: COLORS.lightBlack,

            },
            headerLeft: () => (
                <TouchableWithoutFeedback style={{ padding: 10 }} onPress={() => navigation.goBack()}>

                    <Image source={Images.backArrow} style={{ height: FONT.fs_20, width: FONT.fs_20, marginLeft: 13 }} />
                </TouchableWithoutFeedback>
            ),
            headerTintColor: "#ffff",
            headerTitleAlign: "center",
            headerTitle: "Settings"
        })
    }, [])


    const { user } = useContext(SpotifyContext)

    const handleLogout = () => {
        AsyncStorage.removeItem('access_token').then(() => {
            alert('logoutt success')
        })
        
    }

    return (
        <View style={styles.container}>

            <View style={styles.topContainer}>
                <Text style={styles.topText}>Free Account</Text>

                <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                    <Text>Log out</Text>
                </TouchableOpacity>

            </View>


            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 13,
                height: 70
            }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <TouchableOpacity style={{width:60,height:60,borderRadius:50}}>
                        <Image source={{uri:user?.images[0]?.url}} resizeMode="center" style={{ width: '100%',height:'100%',borderRadius:50 }} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10 }}>

                        <Text style={{ fontSize: FONT.fs_20, color: COLORS.white }}>{user.display_name}</Text>
                        <Text style={{ marginTop: 5, color: COLORS.gray }}>View Profile</Text>
                    </View>
                </View>
                <Image source={Images.next} />
            </View>

        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black
    },
    btn: {
        width: 140,
        height: 50,
        borderRadius: 24,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200
    },
    topText: {
        color: COLORS.white,
        fontSize: 17,
        marginBottom: 20

    }
})