import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default class Product extends React.Component {
    render(){
        return(
            <View style={styles.container}>

            
            <TouchableWithoutFeedback onPress={()=>console.log("Hi")}>
                <Image source={require('../../assets/images/product1.png')} style={styles.product_image}/>
                <Text style={{textAlign: 'center',color:'black'}}>New Abaya</Text>
                <Text style={{textAlign: 'center',color:'#193ed1',fontWeight:'bold'}}>$20</Text>

            </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:'45%',
        marginTop:20,
       
    },
    product_image:{
        width:'100%',
        height:220
    }
})