// import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../constants/imgages';
import { COLORS, FONT } from '../constants/style';
import Home from '../screens/Home';
import Library from '../screens/Library';
import PlayList from '../screens/PlayList';
import Premium from '../screens/Premium';
import Recent from '../screens/Recent';
import Search from '../screens/Search';
import PlayState from './PlayState';
import { useNavigationState } from '@react-navigation/native'
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator()

const SpotifyStack = () => {


    useEffect(() => {

        AsyncStorage.getItem('access_token').then(key => {
            console.log(key);
        }).catch(err=> console.log())

    },[])

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureDirection: "vertical-inverted",
        }}>
            {/* home screen */}
            <Stack.Screen name="Tab" component={Tab} />
            {/* recent players */}
            <Stack.Screen name='Recent' component={Recent} />
            <Stack.Screen name='Login' component={Login}/>
            {/* <Stack.Screen name='Home' component={Home}/> */}
            
            {/* settings screen */}
            {/* <Stack.Screen name="settings" component={Settings}/> */}
            {/* search screen */}
            {/* <Stack.Screen /> */}
            {/* library screen */}
            {/* <Stack.Screen /> */}
        </Stack.Navigator>
    )
};

export default SpotifyStack;


const Tab = () => {
    return (
        <BottomTab.Navigator screenOptions={{

            tabBarActiveTintColor: COLORS.white,
            tabBarInactiveTintColor: COLORS.gray,
            tabBarStyle: {
                backgroundColor: "transparent",
                elevation: 0,
                position: 'absolute',
                borderTopWidth: 0,
                height: 60
            },
            headerShown: false,
            tabBarBackground: () => (<LinearGradient colors={["transparent", "#191414", "#191414"]} style={{ width: '100%', height: '100%', opacity: 0.8 }} />),
            
        }}
            // tabBar={props => <CustomTab {...props} />}
        >


            <BottomTab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused, size }) => focused ? <Image source={Images.homeFilled} resizeMode="center" style={{ width: '100%' }} /> : <Image source={Images.homeOutlined} resizeMode="center" style={{ width: '100%' }} />,
                    tabBarIconStyle: {
                        width: 10,
                        height: 10
                    }
                }}
            />
            <BottomTab.Screen name="Search" component={Search}
                options={{
                    tabBarIcon: ({ focused, size }) => focused ? <Image source={Images.search} resizeMode="center" style={{ width: '100%' }} /> : <Image source={Images.search} resizeMode="center" style={{ width: '100%' }} />,
                    tabBarIconStyle: {
                        width: 10,
                        height: 10
                    }
                }}
            />

            <BottomTab.Screen name="Your Library" component={Library}
                options={{
                    tabBarIcon: ({ focused, size }) => focused ? <Image source={Images.collecton} resizeMode="center" style={{ width: '100%' }} /> : <Image source={Images.collecton} resizeMode="center" style={{ width: '100%' }} />,
                    tabBarIconStyle: {
                        width: 10,
                        height: 10
                    }
                }}
            />
            <BottomTab.Screen name="Premium" component={Premium}
                options={{
                    tabBarIcon: ({ focused, size }) => focused ? <Image source={Images.spotify} resizeMode="center" style={{ width: '100%' }} /> : <Image source={Images.spotify} resizeMode="center" style={{ width: '100%' }} />,
                    tabBarIconStyle: {
                        width: 10,
                        height: 10
                    },
                    
                    
                }}
            />


            <BottomTab.Screen
                name='Recent'
                component={Recent}
                options={{
                    tabBarButton: () => null,

                }}
            />
            <BottomTab.Screen
                name='playlist'
                component={PlayList}
                options={{
                    tabBarButton: () => null,

                }}
            />

            <BottomTab.Screen
                name='settings'
                component={Settings}
                options={{
                    tabBarButton: () => null,
                

                }}
            />
          

        </BottomTab.Navigator>
    )
}



// const CustomTab = ({ navigation }) => {


//     return (
//         <View style={{ width: '100%', height: 100, backgroundColor: "trasparent", position: 'absolute', bottom: 5 }}>
//             <View style={{ width: '100%', height: 40, borderRadius: 20, marginBottom: 10 }}><Text>Play state menu</Text></View>
//             <LinearGradient colors={["transparent", "#000", "#000", "#000"]} style={{ width: '100%', height: 60, opacity: 0.8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} >



//                 <TouchableOpacity style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Recent')}>
//                     <Image source={Images.homeFilled} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
//                     <Text style={{ color: '#fff', fontSize: 9, paddingTop: 3 }}>Home</Text>
//                 </TouchableOpacity>




//                 <TouchableOpacity style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Recent')}>
//                     <Image source={Images.homeFilled} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
//                     <Text style={{ color: '#fff', fontSize: 9, paddingTop: 3 }}>Home</Text>
//                 </TouchableOpacity>


//                 <TouchableOpacity style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Recent')}>
//                     <Image source={Images.homeFilled} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
//                     <Text style={{ color: '#fff', fontSize: 9, paddingTop: 3 }}>Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Recent')}>
//                     <Image source={Images.homeFilled} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
//                     <Text style={{ color: '#fff', fontSize: 9, paddingTop: 3 }}>Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Recent')}>
//                     <Image source={Images.homeFilled} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
//                     <Text style={{ color: '#fff', fontSize: 9, paddingTop: 3 }}>Home</Text>
//                 </TouchableOpacity>

//             </LinearGradient>
//         </View>

//     )
// }
