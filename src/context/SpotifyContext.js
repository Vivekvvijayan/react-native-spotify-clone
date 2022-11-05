import { useState, createContext } from 'react'

export const SpotifyContext = createContext({})

export const Spotify = ({ children }) => {

   const [playlist,setPlaylist] = useState([])
   const [user,setUser] = useState([])
   const [token,setTokken] = useState(' ')
   const [recentSongs,setResentSongs] = useState([])
   const [album,setAlbum] = useState([])
   const [isPlaying,setIsplaying] = useState(false)
   const[featuredPlaylist,setFeaturedPlaylist] = useState([])
   const [currentPlaylistId,setCurrentPlaylistId] = useState('')
   const [featuredSongs,setFeaturedSongs] = useState([])
   const [currentSong,setCurrentSong] = useState('')
    const [newRelease,setNewRelease] = useState([])
    return (
        <SpotifyContext.Provider value={{playlist,setPlaylist,user,setUser,token,setTokken,recentSongs,setResentSongs,isPlaying,setIsplaying,album,setAlbum,featuredPlaylist,setFeaturedPlaylist,currentPlaylistId,setCurrentPlaylistId,featuredSongs,setFeaturedSongs,currentSong,setCurrentSong,newRelease,setNewRelease}}>
            {children}
        </SpotifyContext.Provider>
    );
};