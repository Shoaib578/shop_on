import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import base_url from '../../base_url'
export default class Product extends React.Component {
    state = {
        role:''
    }
   getUserRole =async ()=>{
    const user = await AsyncStorage.getItem("user")
    const parse= JSON.parse(user)
    this.setState({role:parse.role})
   }
   componentDidMount(){
       this.getUserRole()
       console.log(this.props.data)
       this.props.navigation.addListener("focus",()=>{
           this.getUserRole()
       })
   }
    render(){
        if(this.props.type == 'buyer'){
            return(
                <View style={styles.container}>
    
                
                <TouchableWithoutFeedback onPress={()=>{
                    if(this.state.role == "supplier"){
                        this.props.navigation.navigate('view_item',{id:this.props.data.item.items[0]._id})
    
                    }else{
                        this.props.navigation.navigate('view_item',{id:this.props.data.item.items[0]._id,new_item_id:this.props.data.item._id})
    
                        
                    }
                }
                }>
                    <Image source={{uri:base_url+'/uploads/'+this.props.data.item.items[0].item_image1}} style={styles.product_image}/>
                    <Text style={{textAlign: 'center',color:'black'}}>{this.props.data.item.items[0].item_name}</Text>
                    <Text style={{textAlign: 'center',color:'#193ed1',fontWeight:'bold'}}>{this.props.data.item.items[0].price} {this.props.data.item.items[0].currency}</Text>
    
                </TouchableWithoutFeedback>
                </View>
            )
        }else{
            return(
                <View style={styles.container}>

            
            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('view_item',{id:this.props.data.item._id})}>
                <Image source={{uri:base_url+'/uploads/'+this.props.data.item.item_image1}} style={styles.product_image}/>
                <Text style={{textAlign: 'center',color:'black'}}>{this.props.data.item.item_name}</Text>
                <Text style={{textAlign: 'center',color:'#193ed1',fontWeight:'bold'}}>{this.props.data.item.price} {this.props.data.item.currency}</Text>

            </TouchableWithoutFeedback>
            </View>
            )
        }
        
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