import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/style'
import { useNavigation } from '@react-navigation/native'

const PlaylistBox = ({ img,name,id,owner,news }) => {

    const navigation = useNavigation()
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('playlist',{ id,banner:img })}>
            <View style={styles.container}>
                <View style={styles.boxImageStyle}>
                    <Image
                        source={{
                            uri: img && img

                        }}
                        style={styles.recentIcon}
                        resizeMode="cover"
                    />
                </View>
                <Text style={{
                    color: COLORS.white,
                    fontSize: 13,
                    overflow: 'scroll',
                    maxWidth: 'auto',
                    marginTop: 4
                }} numberOfLines={1}>{name}</Text>
                <Text style={{
                    color: COLORS.gray,
                    fontSize: 11,
                    marginTop: 4
                }}>{owner?.display_name} </Text>
            </View>
        </TouchableOpacity>
    )
}

export default PlaylistBox

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 210,

        padding: 5,
        elevation: 5

    },
    boxImageStyle: {
        width: '100%',
        height: '80%'
    },
    recentIcon: {
        width: '100%',
        height: '100%'
    }

})