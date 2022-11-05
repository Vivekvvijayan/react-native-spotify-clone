import { Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { Images } from '../constants/imgages'
import { COLORS, FONT } from '../constants/style'
import { SpotifyContext } from '../context/SpotifyContext'
import { Audio } from 'expo-av'


const PlayRow = ({ name,songURL, image, displayName, artist = '' }) => {

  const { currentSong,setCurrentSong } = useContext(SpotifyContext)

  const handlePlay = async () => {
    setCurrentSong(songURL)
    const { sound } = await Audio.Sound.createAsync({
        uri: songURL,
    }, { shouldPlay: true });
    // setSound(sound)

    
    console.log('playing sound');
    await sound.playAsync();



}

    return (
        <Pressable style={styles.container} android_ripple={{ color: COLORS.gray, borderless: false, radius: 400 }} onPress={handlePlay}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={styles.image}>

                    <Image
                        source={{
                            uri: image && image

                        }}
                        style={styles.recentIcon}
                        resizeMode="contain"
                    />
                </View> 
                <View style={styles.trackName}>
                    <Text style={[styles.albumName, currentSong === songURL ? styles.playStyle : styles.noPlayStyle]} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                    {
                        artist !== '' ? <Text style={styles.singerName}>{artist[0].name} {artist[1] !== undefined ? ',' + ' ' + artist[1].name : ''}</Text> :
                            <Text style={styles.singerName}>{displayName && displayName}</Text>
                    }
                </View>
            </View>
            <TouchableOpacity>

                <Image source={Images.dots} resizeMode="contain" style={{ width: FONT.fs_20 }} />
            </TouchableOpacity>
        </Pressable>
    )
}

export default PlayRow

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        backgroundColor: COLORS.black,
        justifyContent: 'space-between',
        padding: 15,
        flexDirection: 'row'
    },
    image: {
        width: 50,
        height: 50,


    },
    recentIcon: {
        width: '100%',
        height: '100%'
    },
    trackName: {
        paddingLeft: 10,
        maxWidth:'85%'
    },
    albumName: {
        fontSize: 14,
        color:COLORS.white,
        fontWeight: "200"
    },
    singerName: {
        color: COLORS.gray,
        fontSize: 12,
        marginTop: 4
    },
    playStyle:{
        color:COLORS.green
    },
    noPlayStyle:{
        color:COLORS.white
    }
})