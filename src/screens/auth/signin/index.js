import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity,Image, Alert, ActivityIndicator,StyleSheet} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import validator from 'validator';
import  Axios  from 'axios';
import base_url from '../../../base_url';

class Signin extends React.Component {
    state = {
        phone_no:"",
        password:"",
        is_loading:false
    }

    SignIn = ()=>{
    
    
        if(validator.isMobilePhone(this.state.phone_no) == false){
            Alert.alert("Invalid Phone Number")
            return false;
        }

        if(this.state.password.length>4 || this.state.password.length<4){
            Alert.alert("Password Must Be  4 characters")
            return false;
        }

        this.setState({is_loading:true})
        let formData = new FormData()
        formData.append('phone_no',this.state.phone_no)
        formData.append('password',this.state.password)

        Axios.post(base_url+'/apis/user/login_user',{
            "phone_no":this.state.phone_no,
            "password":this.state.password
        })
        .then(async(res)=>{
            if(res.data.msg == "logged in Succesfully"){
                this.setState({is_loading:false,})
               await AsyncStorage.setItem("user",JSON.stringify(res.data.user))
               console.log(res.data.user.role)
               if(res.data.user.role == "supplier"){
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'SupplierNavigator', screen: 'Dashboard' }]
                });
                
               }else{
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainNavigator', screen: 'Home' }]
                });
               }
               
            }else{
                Alert.alert(res.data.msg)
                this.setState({is_loading:false})

                return false
            }
        })
        .catch(err=>{
            console.log(err)
            Alert.alert("Something Went Wrong")
            this.setState({is_loading:false})
            return false
        })

       
    }
    render(){
        return(
            <ScrollView style={styles.container}>
                <Image source={require('../../../assets/images/shopon-logo.png')} style={{width:120,height:120,marginTop:70,alignSelf:'center'}}/>

                <SafeAreaView style={{marginTop:10,alignItems: 'center',alignSelf: 'center',}}>



                <Text style={{color:'white',fontSize:18,marginTop:30}}>Login to Your Account</Text>
                

                <View style={styles.text_input}>
                <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Digit Mobile Number +9....." onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.phone_no} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>



                <View style={styles.text_input}>
                <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="4 Digit Pin" keyboardType='numeric' secureTextEntry selectionColor="white" onChangeText={(val)=>this.setState({password:val})} value={this.state.password} placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>

               

                <TouchableOpacity disabled={this.state.is_loading} onPress={this.SignIn} style={styles.submit_btn} >
                     {this.state.is_loading?<ActivityIndicator size="large" color="#193ed1" />:null}
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'#193ed1'}}>Sign In</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('choose_type')}>
                    <Text style={{color:'white',fontSize:15}}>Create An Account</Text>
                </TouchableOpacity>

              

                </View>

                </SafeAreaView>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        
        backgroundColor: '#193ed1',
        
    },
   

    
    phoneImageStyle:{
        padding: 0,
        marginLeft:9,  
       
       
        alignItems: 'center',
        margin:12,
        
      },

      user_name_text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"white",
        color:"#BB952D",
        
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:Dimensions.get('window').height*2/16,
      },

      text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"white",
        color:"#BB952D",
        
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:20,
      },
      submit_btn:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"white",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:40,
        marginBottom:10
      }
})
export default Signin