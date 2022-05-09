import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'

export default class Loading extends React.Component{
    render(){
        return <View style={styles.container}>
            <Image source={require('../../assets/images/shopon-logo.png')} style={styles.logo}/>
        </View>
    }
}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#193ed1',
    justifyContent: 'center',
    alignItems: 'center',
},
logo:{
    width:170,
    height:170
}
})