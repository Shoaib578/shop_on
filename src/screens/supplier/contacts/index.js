import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ScrollView,ActivityIndicator,Alert,} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'
import validator from 'validator';

export default class Contacts extends React.Component {
    state = {
        user_name:'',
        phone_no:'',

        contacts:[],
        searched_contacts:[],
        is_loading: false,
        page_loading:true,
        
    }

    add_contact = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.user_name.length<1){
            Alert.alert("Name Field is required")
            return false
        }
        if(validator.isMobilePhone(this.state.phone_no) == false){
            Alert.alert("Invalid Phone Number")
            return false
        }
        this.setState({is_loading:true})

        const data = {
            "user_name":this.state.user_name,
            "added_by":parse._id,
            "phone_no":this.state.phone_no
        }
        Axios.post(base_url+"/apis/contacts/add",data)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.setState({is_loading:false})
            this.getContacts()

        })
        .catch(err=>{
            console.log(err)
            Alert.alert('Something Went wrong')
            this.setState({is_loading:false})
        })
    }

    getContacts = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+"/apis/contacts/get_contacts?user_id="+parse._id)
        .then(res=>{
            this.setState({contacts:res.data.contacts})
            this.setState({searched_contacts:this.state.contacts},()=>{
                this.setState({page_loading:false})
            })
        })
    }

    delete_contact = (id)=>{
        Axios.get(base_url+"/apis/contacts/delete?id="+id)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.getContacts()

        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }


    search_contact = (val)=>{
        console.log(val)
        
            this.setState({searched_contacts:this.state.contacts.filter(i=>i.user_name.toLowerCase().includes(val.toLowerCase()))})
       

    }
    componentDidMount(){
        this.getContacts()
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.text_input}>
                <FontAwesome name="user" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="User Name"  selectionColor="white" onChangeText={(val)=>this.setState({user_name:val})} value={this.state.user_name} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>

                <View style={styles.text_input}>
                <FontAwesome name="phone" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="Phone Number"  selectionColor="white" onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.phone_no} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>

                <TouchableOpacity onPress={this.add_contact} disabled={this.state.is_loading} style={styles.submit_btn} >
                {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Create</Text>
                </TouchableOpacity>


                <View style={styles.text_input}>
                <Feather name="search" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="search contact"  selectionColor="white" onChangeText={(value)=>{
                  if(value.length>0){
                   

                     this.search_contact(value)

                  }else{
                      this.getContacts()
                  }

                }}  placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>

               {this.state.page_loading == false? 
               <ScrollView style={{flex:1}}>
               {this.state.searched_contacts.map((data,index)=>(
               <View key={index} style={styles.item_container}>
               <View style={{flexDirection: 'row',}}>
               <FontAwesome name= "user-circle-o" color="red" size={20}/>

               <Text style={{color:'#BB952D',left:8}}>{data.user_name}</Text>
               </View>
               

               <TouchableOpacity onPress={()=>this.delete_contact(data._id)}>
               <FontAwesome name= "trash" color="red" size={20}/>

               </TouchableOpacity>

           </View>
               ))}
      


       
       <View>
           <Text> </Text>
       </View>

       </ScrollView>
               
               
               : <ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>} 
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
        flexDirection: 'row',
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