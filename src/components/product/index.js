import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import base_url from '../../base_url'
export default class Product extends React.Component {
   
    render(){
        return(
            <View style={styles.container}>

            
            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('view_item',{id:this.props.data.item._id})}>
                <Image source={{uri:base_url+'/uploads/'+this.props.data.item.item_image1}} style={styles.product_image}/>
                <Text style={{textAlign: 'center',color:'black'}}>{this.props.data.item.item_name}</Text>
                <Text style={{textAlign: 'center',color:'#193ed1',fontWeight:'bold'}}>${this.props.data.item.price}</Text>

            </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:'45%',
        marginTop:20,
        marginLeft:10
       
    },
    product_image:{
        width:'100%',
        height:220
    }
})