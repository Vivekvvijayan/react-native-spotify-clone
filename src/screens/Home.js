import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { COLORS, FONT } from '../constants/style'
import { StatusBar } from 'expo-status-bar'
import { Images } from '../constants/imgages'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'

import { SpotifyContext } from '../context/SpotifyContext'
import SongsRow from '../components/SongsRow'
import PlaylistBox from '../components/PlaylistBox'
import SpotifyWebApi from 'spotify-web-api-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { playlist, setPlaylist, setUser, setTokken, setResentSongs, album, setAlbum, featuredPlaylist, setFeaturedPlaylist, featuredSongs,newRelease,setNewRelease } = useContext(SpotifyContext)

    const spotify = new SpotifyWebApi()
    
    useEffect(() => {

        AsyncStorage.getItem('access_token').then(key => {

            if (key!== null) {
            // set spotify access token
                spotify.setAccessToken(key)

                setLoading(true)
                spotify.getUserPlaylists().then(playlist => {
                    setPlaylist(playlist.items)
                    setLoading(false)
                }).catch(err => {
                    navigation.navigate('Login')
                })

                setLoading(true)
                // get user

                spotify.getMe().then(user => {
                    setUser(user)

                    setLoading(false)
                }).catch(err => console.log(err))


                // setToken

                setTokken(spotify.getAccessToken())

                // get recent songs
                setLoading(true)

                spotify.getMyRecentlyPlayedTracks().then(recentTrack => {
                    setResentSongs(recentTrack.items)
                    setLoading(false)
                }).catch(err => console.log(err))



                // get albums

                setLoading(true)
                spotify.getAlbum().then(album => {
                    setAlbum(album)
                    setLoading(false)
                }).catch(err => console.log(err))

                //    get featured playlist
                setLoading(true)
                spotify.getFeaturedPlaylists().then(featuredPlaylists => {
                    setFeaturedPlaylist(featuredPlaylists.playlists.items)
                    setLoading(false)
                }).then(err => console.log(err))
            }else{
                navigation.navigate('Login')
            }

        }).catch(err => console.log('err in key find ...'))


        // get new realse

       
     
        
    }, [spotify.getAccessToken()])


    return (
        <ScrollView style={styles.container} >
            <StatusBar backgroundColor={COLORS.black} style="light" />


            <View style={styles.topBar}>

                <Text style={styles.text}>Good afternoon</Text>

                <View style={styles.rightIcons}>

                    <Image
                        source={Images.bell}
                        style={styles.icon}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Recent')}>

                        <Image
                            source={Images.clock}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('settings')}>

                        <Image
                            source={Images.settings}
                            style={styles.icon}

                        />
                    </TouchableOpacity>

                </View>
            </View>


            <ScrollView style={{ width: '100%', backgroundColor: COLORS.black }} >
                <View style={styles.tagBox}>

                    <Text style={styles.tagBoxText}>Music</Text>
                    <Text style={styles.tagBoxText}>Products & shows</Text>


                </View>
            </ScrollView>


            {/* recent plays */}


            <View style={{ width: '100%', height: 200, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {
                    !loading ? <>
                        <View>

                            <HomeFlatComponent img={playlist[0]?.images[0]?.url} name={playlist[0]?.name} id={playlist[0]?.id}/>
                            <HomeFlatComponent img={playlist[1]?.images[0]?.url} name={playlist[1]?.name} id={playlist[1]?.id}/>
                            <HomeFlatComponent img={playlist[2]?.images[0]?.url} name={playlist[2]?.name} id={playlist[2]?.id}/>
                        </View>

                        <View>


                            <HomeFlatComponent img={playlist[3]?.images[0]?.url} name={playlist[3]?.name} id={playlist[3]?.id}/>
                            <HomeFlatComponent img={playlist[4]?.images[0]?.url} name={playlist[4]?.name} id={playlist[4]?.id}/>
                            <HomeFlatComponent img={playlist[5]?.images[0]?.url} name={playlist[5]?.name} id={playlist[5]?.id}/>

                        </View>


                    </> : <ActivityIndicator size={"large"} color={COLORS.green} />
                }
            </View>




            <Text style={styles.scrollBoxHeader}>Jump Back In</Text>

            <ScrollView horizontal contentContainerStyle={{ padding: 10 }}>

                {
                    !loading ? featuredPlaylist?.map((playlist, i) => <PlaylistBox key={i} img={playlist?.images[0]?.url} name={playlist?.name} id={playlist?.id} owner={playlist?.owner} />) : <ActivityIndicator size={"small"} color={COLORS.green} />
                }


            </ScrollView>
            <Text style={styles.scrollBoxHeader}>New Releases</Text>
            <ScrollView horizontal contentContainerStyle={{ padding: 10 }}>

                 


            </ScrollView>
            <ScrollView horizontal contentContainerStyle={{ padding: 10 }}>

                <PlaylistBox />
                <PlaylistBox />
                <PlaylistBox />
                <PlaylistBox />
                <PlaylistBox />
                <PlaylistBox />

            </ScrollView>



        </ScrollView>
    )
}

export default Home

const HomeFlatComponent = ({ img, name,id }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.recentPlaylistStyle} onPress={() => navigation.navigate('playlist',{id})}>
            <View style={{
                width: 60,
                height: '100%',

            }}>

                <Image
                    source={{
                        uri: img ? img : 'img'

                    }}
                    style={styles.recentIcon}
                    resizeMode="cover"
                />
            </View>
            <Text style={{ color: COLORS.white, textAlign: 'left', paddingHorizontal: 5, maxWidth: '70%', fontSize: 12 }}>{name}</Text>



        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        marginTop: 10
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        paddingHorizontal: 15,

    },
    icon: {
        height: FONT.iconHeight,
        width: FONT.iconWidth
    },
    rightIcons: {
        flexDirection: 'row',
        width: 130,
        justifyContent: 'space-around'
    },
    text: {
        color: COLORS.white,
        fontSize: FONT.iconWidth
    },
    tagBox: {

        height: 60,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,


    },
    tagBoxText: {
        padding: 7,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: COLORS.lightBlack,
        marginLeft: 10,
        color: COLORS.white,
    },
    recentPlaylistStyle: {
        minWidth: 190,
        width: 'auto',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: COLORS.lightBlack,
        maxWidth: 190,
        marginTop: 5,
        marginLeft: 5,




    }
    ,
    textSmall: {
        fontSize: FONT.fontNormal,
        color: COLORS.white,

    },
    recentIcon: {
        width: '100%',
        height: '100%',

    },
    scrollBoxHeader: {
        fontSize: FONT.medium,
        marginLeft: 20,
        color: COLORS.white,
        paddingTop: 10
    }
})