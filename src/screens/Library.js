import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { COLORS } from '../constants/style'
import { SpotifyContext } from '../context/SpotifyContext'
import PlayRow from '../components/PlayRow'

const Library = ({ navigation }) => {
  const {playlist} = useContext(SpotifyContext)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:true,
      headerTransparent:true,
      headerTintColor:'#fff',
      headerTitleAlign:"center"
    })
  },[])

  // console.log(playlist[5].display_name);
  return (
    <View style={styles.container}>
      {
        playlist?.map(({name,images,owner,i}) => <PlayRow key={i} name={name} image={images[0].url} displayName={owner.display_name}/>)
      }
    </View>
  )
}

export default Library

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.black,
        paddingVertical:100
        
    }
})