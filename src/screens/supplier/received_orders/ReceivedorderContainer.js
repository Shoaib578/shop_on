import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class ReceivedOrderContainer extends React.Component{
    render(){
        return(
            <View style={styles.item_container}>
                    <Image source={require('../../../assets/images/product1.png')} style={{width:'100%',height:150,borderRadius:10}}/>
                    <View style={{marginTop:5,marginLeft:10}}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',padding:3}}>
                        <Text style={{color:'black',marginTop:10,fontWeight:'bold'}}>New Abaya</Text>
                         <Text style={{color:'#BB952D',right:10}}>price : 20$</Text>
                        </View>
                   
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',padding:3}}>
                        <Text style={{color:'black'}}>Amount : 3</Text>
                        <View style={{flexDirection: 'row',right:10}}>
                        <Text style={{color:'black',}}>Ordered By : </Text>

                        <TouchableOpacity style={{marginLeft:5}}>
                            <Text style={{color:'blue',fontWeight:'bold'}}>Shoaib</Text>
                        </TouchableOpacity>

                        </View>

                        </View>
                    </View>
                    
                    <TouchableOpacity  style={styles.submit_btn1} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.submit_btn2} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Reject</Text>
                </TouchableOpacity>

                   </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
    },
    text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"black",
        color:"#BB952D",
        
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:20,
        padding:5,
      },
      phoneImageStyle:{
        padding: 3,
        marginLeft:9,  
       
        
        alignItems: 'center',
       
        
      },
      item_container:{
        width:Dimensions.get('window').width*2/2.2,
        marginTop:20,
        borderRadius:10,
       
        borderWidth:1,
       
        borderColor:"#193ed1",
        marginBottom:20
      },
      submit_btn1:{
      
        borderWidth:1,
        borderColor:"green",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'green',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.2,
        marginTop:20,
        alignSelf: 'center',
       
      },
      submit_btn2:{
      
        borderWidth:1,
        borderColor:"red",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'red',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.2,
        marginTop:5,
        alignSelf: 'center',
       
      }
    })
