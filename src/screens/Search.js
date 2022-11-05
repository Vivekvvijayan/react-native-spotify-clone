import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constants/style'
import PlayRow from '../components/PlayRow'
import SpotifyWebApi from 'spotify-web-api-js'
const spotify = new SpotifyWebApi()



const Search = () => {
  const [searchResult, setSearchResult] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery('')
    setSearchResult([])
  }, [])

  const handleSearch = async (text) => {
    setQuery(text)
    if (text !== '') {
      spotify.searchTracks(text).then(tracks => {
        setSearchResult(tracks.tracks.items)
        //  console.log(tracks.tracks.items[0].preview_url));

      }).catch(err => console.log(err))

    } else {
      setSearchResult([])
    }
  }


  return (
    <View style={styles.container}>

      <View style={{ width: '100%', paddingTop: 70, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: COLORS.white, paddingBottom: 20 }}>Search</Text>
        <TextInput
          placeholder='search tracks..'
          style={styles.searchBox}
          onChangeText={text => handleSearch(text)}
          value={query}


        />
      </View>


      <ScrollView style={styles.searchResult} contentContainerStyle={{ paddingBottom: 50 }}>

        {searchResult.length > 0 && query !== '' ?
          searchResult?.map((track, i) => <PlayRow key={i} name={track?.name} songURL={track?.preview_url} image={track?.album?.images[0]?.url} displayName={""} artist={track?.artists} />) : <Text style={{ textAlign: 'center', color: COLORS.gray, fontSize: 15 }}>No tracks available.</Text>
        }

      </ScrollView>


    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black
  },
  searchBox: {
    width: '90%',
    height: 50,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    padding: 10,
    fontSize: 16
  },
  searchResult: {
    width: '100%',
    marginTop: 40
  }
})