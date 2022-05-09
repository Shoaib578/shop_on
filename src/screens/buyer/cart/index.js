import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default class Cart extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <ScrollView >
                   <View style={styles.item_container}>
                <Image source={require('../../../assets/images/product1.png')} style={{width:100,borderRadius:10,height:60,}}/>
                <View style={{marginLeft:20,flexDirection: 'row',flexWrap:'wrap'}}>
                <TouchableOpacity>

                <Text style={{color:'black',}}>New Abaya</Text>
                <Text style={{color:'#193ed1',fontWeight:'bold'}}>$20</Text>
                <Text style={{color:'black',fontWeight:'bold'}}>Amount : 2</Text>


                </TouchableOpacity>


                <TouchableOpacity style={{marginLeft:'55%'}}>
                    <FontAwesome name="trash" color="red" size={20}/>
                </TouchableOpacity>

                </View>

                </View>
                
                <View style={styles.item_container}>
                <Image source={require('../../../assets/images/product1.png')} style={{width:100,borderRadius:10,height:60,}}/>
                <View style={{marginLeft:20,flexDirection: 'row',flexWrap:'wrap'}}>
                <TouchableOpacity>

                <Text style={{color:'black',}}>New Abaya</Text>
                <Text style={{color:'#193ed1',fontWeight:'bold'}}>$20</Text>
                <Text style={{color:'black',fontWeight:'bold'}}>Amount : 2</Text>


                </TouchableOpacity>


                <TouchableOpacity style={{marginLeft:'55%'}}>
                    <FontAwesome name="trash" color="red" size={20}/>
                </TouchableOpacity>

                </View>

                </View>
                
                 </ScrollView>


                 <TouchableOpacity  style={styles.submit_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Order Now</Text>
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
        width:Dimensions.get('window').width*2/2.5,
        marginTop:20,
        borderRadius:10,
        flexDirection: 'row',
        borderWidth:1,
        padding:10,
        borderColor:"#193ed1",
      },
      submit_btn:{
      
        borderWidth:1,
        borderColor:"#193ed1",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#193ed1',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:40,
        marginBottom:40
      }
    })