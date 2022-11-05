import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Images } from '../constants/imgages';
import { COLORS, FONT } from '../constants/style';
// import Sound from 'react-native-sound';
import SpotifyWebApi from 'spotify-web-api-js'
import { Audio } from 'expo-av';
import { useContext, useEffect, useState } from 'react';
import { SpotifyContext } from '../context/SpotifyContext';
import { Sound } from 'expo-av/build/Audio';

const SongsRow = ({ name, artist, img, songURL, owner }) => {
    const { isPlaying, setIsplaying, currentSong, setCurrentSong } = useContext(SpotifyContext)
    console.log(name);
    const spotify = new SpotifyWebApi()

   useEffect(() => {
    setCurrentSong('')
   },[])


    const handlePlay = async () => {
        setCurrentSong(songURL)
        const { sound } = await Audio.Sound.createAsync({
            uri: songURL,
        }, { 
            shouldPlay: isPlaying,
            
        
        });
        // setSound(sound)

        if (isPlaying) {
           
            setIsplaying(false)
        }
        await sound.playAsync();
        console.log('playing sound');
    
    }
        
 
                
    return (

        <TouchableWithoutFeedback style={styles.container} onPress={handlePlay}>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center'

            }}>


                <View style={styles.image}>

                    <Image
                        source={{
                            uri: img

                        }}
                        style={styles.recentIcon}
                        resizeMode="contain"
                    />
                </View>
                <View style={{
                    paddingHorizontal: 10,
                    maxWidth: '82%'
                }}>
                    <Text style={[styles.text_name, currentSong === songURL ? styles.playingStyle : styles.nonPlayingStyle]} numberOfLines={1} ellipsizeMode="tail">{name}</Text>

                    <Text style={{
                        color: COLORS.gray,
                        fontSize: 12,
                        marginTop: 5,

                    }}>{artist[0].name}{artist[1] !== undefined ? ',' + ' ' + artist[1].name : ''}</Text>

                </View>
            </View>
            <Image source={Images.dots} resizeMode="contain" style={{ width: FONT.fs_20, height: FONT.fs_20 }} />
        </TouchableWithoutFeedback>


    )
}

export default SongsRow;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,

    },
    text_name: {
        fontSize: FONT.fontNormal,

        fontWeight: "400",
        width: 'auto',

    },
    image: {
        width: 55,


        height: 55,


    },
    recentIcon: {
        width: '100%',
        height: '100%'
    },
    playingStyle: {
        color: COLORS.green
    },
    nonPlayingStyle: {
        color: COLORS.white
    }
})