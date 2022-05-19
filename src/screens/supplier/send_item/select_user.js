import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default class SelectUser extends React.Component {
    state = {
        select:'',
        search:''
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row',justifyContent: 'space-between',padding:20}}>
                
                <TouchableOpacity style={{borderColor:'blue',borderWidth:1,borderRadius:5,justifyContent: 'center',backgroundColor:this.state.select=='users'?'blue':'white',marginLeft:20,padding:10}} onPress={()=>this.setState({select:"users"})}>
                <Text style={{color:this.state.select=='users'?'white':'black'}}>Users</Text>
                </TouchableOpacity>


                <TouchableOpacity style={{borderColor:'blue',borderWidth:1,borderRadius:5,justifyContent: 'center',backgroundColor:this.state.select=='group'?'blue':'white',marginRight:20,padding:10}} onPress={()=>this.setState({select:"group"})}>
                <Text style={{color:this.state.select=='group'?'white':'black'}}>Group</Text>
                </TouchableOpacity>



                </View>
               

                <View style={styles.text_input}>
                <FontAwesome name="search" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="Search"  selectionColor="white" onChangeText={(val)=>this.setState({search:val})} value={this.state.search} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>


                <ScrollView style={{flex:1,marginTop:10}}>
                    
                    <View style={styles.item_container}>
                    <FontAwesome name= "user-circle-o" color="red" size={20}/>

                 <Text style={{color:'#BB952D'}}>Username</Text>
                
                </View>


                <View style={styles.item_container}>
                <FontAwesome name= "user-circle-o" color="red" size={20}/>

               <Text style={{color:'#BB952D'}}>Username</Text>
               
                </View>


                </ScrollView>

                <TouchableOpacity  style={styles.submit_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Send</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       
    },
    text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"black",
        color:"#BB952D",
        alignSelf: 'center',
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
        alignSelf: 'center',

        borderColor:"#193ed1",
        justifyContent: 'space-between',
      },
      submit_btn:{
        alignSelf:'center',
        borderWidth:1,
        borderColor:"#193ed1",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#193ed1',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginBottom:30
        
      }
    })