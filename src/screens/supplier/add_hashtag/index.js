import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default class AddhasTag extends React.Component {
    state = {
        hash_tag:''
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.text_input}>
                <Feather name="hash" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="Write HashTag"  selectionColor="white" onChangeText={(val)=>this.setState({hash_tag:val})} value={this.state.hash_tag} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>

                <TouchableOpacity  style={styles.submit_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Create</Text>
                </TouchableOpacity>


                <ScrollView style={{flex:1}}>
                    
                    <View style={styles.item_container}>
               <Text style={{color:'#BB952D'}}>Cloths</Text>
                <TouchableOpacity>
                <FontAwesome name= "trash" color="red" size={20}/>
                </TouchableOpacity>
                </View>


                <View style={styles.item_container}>
               <Text style={{color:'#BB952D'}}>Shirts</Text>
                <TouchableOpacity>
                <FontAwesome name= "trash" color="red" size={20}/>
                </TouchableOpacity>
                </View>


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
        justifyContent: 'space-between',
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
        marginTop:30,
        
      }
    })