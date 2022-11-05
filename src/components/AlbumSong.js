import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Images } from '../constants/imgages';
import { COLORS, FONT } from '../constants/style';
// import Sound from 'react-native-sound';
import SpotifyWebApi from 'spotify-web-api-js'
import { Audio } from 'expo-av';
import { useContext, useState } from 'react';
import { SpotifyContext } from '../context/SpotifyContext';

const AlbumSong = () => {
    const { isPlaying, setIsplaying } = useContext(SpotifyContext)

    return (

        <TouchableWithoutFeedback style={styles.container}>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',      
            }}>

                <View style={{
                    paddingHorizontal: 10
                }}>
                    <Text style={styles.text_name}>Dheera dheera nee ..</Text>
                    <Text style={{
                        color: COLORS.gray,
                        fontSize: 12,
                        marginTop: 5,

                    }}>Karthik</Text>

                </View>
            </View>
            <Image source={Images.dots} resizeMode="contain" style={{ width: FONT.fs_20, height: FONT.fs_20 }} />
        </TouchableWithoutFeedback>


    )
}

export default AlbumSong;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 17,

    },
    text_name: {
        fontSize: FONT.fontNormal,
        color: COLORS.white,
        fontWeight: "400"
    },
    image: {
        width: 55,
        height: 55,


    },
    recentIcon: {
        width: '100%',
        height: '100%'
    },
})