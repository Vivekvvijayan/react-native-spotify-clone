import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { getRandomColor } from '../constants/Gradient'
import { Images } from '../constants/imgages'
import { COLORS, FONT } from '../constants/style'

import SongsRow from '../components/SongsRow'
import AlbumSong from '../components/AlbumSong'
import SpotifyWebApi from 'spotify-web-api-js'
import { SpotifyContext } from '../context/SpotifyContext'
import { toTime } from '../utils/Time'
import AsyncStorage from '@react-native-async-storage/async-storage'
const spotify = new SpotifyWebApi();
const PlayList = ({ navigation, route }) => {

    const [liked, setLiked] = useState(false)
    const [color, setColor] = useState('')
    const [duration, setDuration] = useState('');
    const [owner, setOwner] = useState('')
    const [loader, setLoader] = useState(false)
    const { id } = route.params
    const [description, setDescription] = useState('')
    const [likes, setLikes] = useState(0)
    const [newSet,setNewSet] = useState([])



    console.log(id);
    const [banner, setBanner] = useState('https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1')

    const { featuredSongs, setFeaturedSongs } = useContext(SpotifyContext)
    useEffect(() => {

        setLoader(true)

        // get dynamic plaaylist
       

            spotify.getPlaylist(id).then(list => {
            setFeaturedSongs(list.tracks.items) 
            
            setDescription(list.description)
            setLikes(list.followers.total)
            setOwner(list.owner.display_name)
            setBanner(list.images[0]?.url)
            setLoader(false)
        }).catch(err => console.log(err))
    




        let dur = 0;
        for (let i = 0; i < featuredSongs.length; i++) {
            dur += featuredSongs[i].track.duration_ms
        }

        setDuration(toTime(dur))
        setColor(getRandomColor())

        
    }, [id, duration])

    useLayoutEffect(() => {

        // get random color from ur


        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerLeft: () => (
                <TouchableWithoutFeedback style={{ padding: 10 }} onPress={() => navigation.goBack()}>

                    <Image source={Images.backArrow} style={{ height: FONT.fs_20, width: FONT.fs_20, marginLeft: 13 }} />
                </TouchableWithoutFeedback>
            ),
            headerTitle: ""
        })
        setLoader(false)
    }, [id])

    // handle like playlist


    return (

        <>
            {
                loader ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black }}>
                    <ActivityIndicator color={COLORS.green} size={"large"} />
                </View>
                    :


                    <Animated.ScrollView style={styles.container} stickyHeaderHiddenOnScroll={true} contentContainerStyle={{ paddingBottom: 100 }}>

                        <LinearGradient colors={[color, COLORS.black]} start={{ x: 1, y: 0 }} end={{ x: 1, y: 0.9 }} locations={[0, 1]} style={styles.gradient}>

                            <View style={{
                                width: 230,
                                height: 230,
                                marginTop: 60,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 10,
                                elevation: 10,


                            }}>
                                <Image
                                    source={{
                                        uri: banner && banner

                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    resizeMode="cover"
                                />
                            </View>

                            <View style={{
                                width: '100%',
                                height: "auto",
                                marginTop: 20,
                                paddingHorizontal: 20

                            }}>
                                <Text style={{ color: COLORS.gray, fontSize: 15, marginBottom: 4 }} numberOfLines={1}>{description}</Text>
                                <Text style={{
                                    fontSize: FONT.medium,
                                    color: COLORS.white
                                }}>{featuredSongs[0]?.track?.name}</Text>
                                <Text style={{
                                    paddingVertical: 10,
                                    color: COLORS.white
                                }}>{owner}</Text>

                                <Text style={{
                                    color: COLORS.gary,
                                    fontSize: 12,
                                    color: COLORS.gray
                                }}>{likes} likes | {duration}</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                height: 50,
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                justifyContent: 'space-between',


                            }}>
                                <View style={{ flexDirection: 'row', width: 100, paddingVertical: 10 }}>
                                    <TouchableOpacity style={{ width: 25, height: 25 }} onPress={() => setLiked(!liked)}>

                                        <Image source={liked ? Images.heartOutline : Images.heartFill} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: 25, height: 25 }}>

                                        <Image source={Images.dots} resizeMode="contain" style={{ marginStart: 20, width: '100%', height: '100%' }} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity >
                                    <Image source={Images.play} resizeMode="contain" style={{ width: FONT.largeIcon }} />
                                </TouchableOpacity>
                            </View> 



                            {
                                featuredSongs?.map((song, i) => <SongsRow key={i} name={song?.track?.name} artist={song?.track?.artists} img={song?.track?.album?.images[0]?.url} songURL={song?.track?.preview_url} />)

                            }

                          



                        </LinearGradient>


                    </Animated.ScrollView>
            }
        </>

    )
}

export default PlayList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black
    },
    gradient: {
        width: '100%',
        maxHeight: '60%',
        justifyContent: "flex-start",
        alignItems: 'center'
    }
})