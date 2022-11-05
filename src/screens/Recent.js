import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useReducer } from 'react'
import { COLORS, FONT } from '../constants/style'
import { Images } from '../constants/imgages'
import PlayRow from '../components/PlayRow'
import { reducer, initialState } from '../reducer/reducer'
import SongsRow from '../components/SongsRow'
import { SpotifyContext } from '../context/SpotifyContext'

const Recent = ({ navigation }) => {
    const {recentSongs } = useContext(SpotifyContext)
    console.log(recentSongs[0].track.preview_url);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>

                    <Image source={Images.backArrow} style={{ height: FONT.fs_20, width: FONT.fs_20, marginLeft: 13 }} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: COLORS.black,

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: '200',

            },
            headerTitle: () => <Text style={{ fontSize: 14, color: COLORS.white }}>Recently played</Text>,
            headerShadowVisible: false,
            headerTitleAlign: 'center',



        })
    }, [])


    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:60}}>

          {
            recentSongs?.map((item,i) => <SongsRow key={i} name={item.track.name} artist={item.track.artists} img={item.track.album.images[0].url} songURL={item.track.preview_url}/>)
          }


        </ScrollView>
    )
}

export default Recent






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingVertical: 1,

    }
})