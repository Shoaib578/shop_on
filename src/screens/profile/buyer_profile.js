import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity, ActivityIndicator, Alert,StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Axios from 'axios'
import Foundation from 'react-native-vector-icons/Foundation'
import validator from 'validator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import base_url from '../../base_url';
class BuyerProfile extends React.Component {
    state = {
       
        password:"",
       
        phone_no:"",
       
        is_loading:false,
        name:'',
        prev_phone_no:''
       
      
    }
    getUserData = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/user/profile_screen?user_id='+parse._id)
        .then(res=>{
            this.setState({name:res.data.user.buyer.name,phone_no:res.data.user.phone_no,prev_phone_no:res.data.user.phone_no})
        })
    }

    UpdateProfile = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        let data= ''

        if(validator.isMobilePhone(this.state.phone_no)){
           console.log("valid phone number")
        }else{
            Alert.alert("Invalid Phone Number")
            return false
        }

        if(this.state.name.length<5){
            Alert.alert("First Name must be at least 5 characters")
            return false

        }

        if((this.state.password.length>0 && this.state.password.length<4) || (this.state.password>0 && this.state.password.length>4) ){
            Alert.alert("Password Must Be 4  characters")
            return false
        }

        this.setState({is_loading:true})
        if(this.state.password.length<1){
             data = {
                "role":"buyer",

                "user_id":parse._id,
                "phone_no":this.state.phone_no == this.state.prev_phone_no?'':this.state.phone_no,
             
                "name":this.state.name,
              
               
            }
        }else{
             data = {
                "role":"buyer",

                "user_id":parse._id,
                "phone_no":this.state.phone_no == this.state.prev_phone_no?'':this.state.phone_no,
             
                "name":this.state.name,
                "password":this.state.password,
            }
        }
      
        Axios.post(base_url+'/apis/user/update_profile',data)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.getUserData()
            .then(()=>{
                this.setState({is_loading:false})
            })
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({is_loading:false})

        })
    }

   
    componentDidMount(){
        this.getUserData()
    }
    render(){
        return(
            <ScrollView style={styles.SignupSellerContainer}>
            <SafeAreaView style={{alignItems: 'center',alignSelf: 'center',}}>
            
            <View style={styles.text_input}>
                <Feather name="user" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="Name" value={this.state.name} selectionColor="#193ed1"  placeholderTextColor="#193ed1" onChangeText={(val)=>this.setState({name:val})} style={{flex:1,color:'#193ed1'}} 
                />
                </View>
          
            <View style={styles.text_input}>
            <Feather name="smartphone" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
            <TextInput placeholder="Phone" selectionColor="white" onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.phone_no}  placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1'}} 
            />
            </View>



           



            <View style={styles.text_input}>
            <Feather name="lock" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
            <TextInput placeholder="4 digit numeric pin" value={this.state.password} secureTextEntry onChangeText={(val)=>this.setState({password:val})} selectionColor="white" placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1'}} 
            />
            </View>

           

          
           




            <TouchableOpacity onPress={this.UpdateProfile} style={[styles.submit_btn,{marginBottom:20}]} >
            {this.state.is_loading?<ActivityIndicator size="large" color="white"/>:null}
                
                <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Update</Text>
            </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',

    },
    i_am_seller_btn:{
        borderWidth:1,
        borderColor:'white',
        padding:10,
        width:Dimensions.get('window').width*2/2.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5 ,
        flexDirection:'row'
    },
    i_am_buyer_btn:{
        borderWidth:1,
        borderColor:'white',
        padding:10,
        width:Dimensions.get('window').width*2/2.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5 ,
        flexDirection:'row'
    },

    SignupSellerContainer:{
        flex:1,
        
        backgroundColor: 'white'
    },
    phoneImageStyle:{
        padding: 0,
        marginLeft:9,  
       
       
        alignItems: 'center',
        margin:12,
        
      },

     

      text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"#193ed1",
        color:"#193ed1",
        
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:20,
      },
      submit_btn:{
      flexDirection:'row',
        borderWidth:1,
        borderColor:"#193ed1",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#193ed1',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:40,
        marginBottom:20
      }
})
export default BuyerProfile