import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ReceivedOrderContainer from './ReceivedorderContainer'
export default class ReceivedOrders extends React.Component {
    render(){
        return (
            <View style={styles.container}>
               <ScrollView showsVerticalScrollIndicator={false}>
                   <ReceivedOrderContainer />
                   <ReceivedOrderContainer />

               </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
       
    },
    
    })