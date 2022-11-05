import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/style'

const Premium = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:COLORS.white,textAlign:'center',fontSize:17,backgroundColor:COLORS.gray,padding:20,borderRadius:20}}>Try Spotify Premium</Text>
    </View>
  )
}

export default Premium

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.black,
        justifyContent:'center',
        padding:10
    }
})