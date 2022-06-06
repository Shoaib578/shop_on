import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity, Alert,StyleSheet, ActivityIndicator} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'

import Axios from 'axios';
import validator from 'validator'

import base_url from '../../../base_url'



class Buyer extends React.Component {
    state = {
        name:'',
        password:"",
       
        phone_no:"",
       
        is_loading:false
    }

    SignUp = ()=>{
        
       
        if(this.state.name.length<5){
            Alert.alert("First Name must be at least 5 characters")
            return false

        }

       

        if(validator.isMobilePhone(this.state.phone_no)){
           console.log("valid phone number")
        }else{
            Alert.alert("Invalid Phone Number")
            return false
        }

      
      
        if(this.state.password.length>4 || this.state.password.length<4){
            Alert.alert("Password Must Be  4 characters")
            return false;
        }
        
        this.setState({is_loading:true})
        
        const data = {
            "name":this.state.name,
            "phone_no":this.state.phone_no,
            "password":this.state.password,
            "role":"buyer"
        }

        Axios.post(base_url+'/apis/user/sign_up',data)
        .then(res=>{
            Alert.alert(res.data.msg)
            
            if(res.data.msg != "User Already Exist"){
                this.setState({is_loading:false,name:"",phone_no:"",password:""})
            
                this.props.navigation.goBack(null)
                this.props.navigation.goBack(null)

            }
           
           
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({is_loading:false})
           
        })

      
    }



   
    render(){
        return(
            <ScrollView style={styles.SignupSellerContainer}>
                <SafeAreaView style={{marginTop:10,alignItems: 'center',alignSelf: 'center',}}>
                <Text style={{color:'white',fontSize:18,marginTop:Dimensions.get('window').height*2/30,}}>Create  Your Account</Text>

                <View style={styles.text_input}>
                <Feather name="user" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder=" Name" value={this.state.name} selectionColor="white"  placeholderTextColor="#DBDBDB" onChangeText={(val)=>this.setState({name:val})} style={{flex:1,color:'white'}} 
                />
                </View>
               
                <View style={styles.text_input}>
                <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Phone" value={this.state.phone_no} selectionColor="white" onChangeText={(val)=>this.setState({phone_no:val})}  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>



              

                <View style={styles.text_input}>
                <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="4 digit numeric pin" keyboardType='numeric'  value={this.state.password} secureTextEntry onChangeText={(val)=>this.setState({password:val})} selectionColor="white" placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>


               


                <TouchableOpacity onPress={this.SignUp}  style={styles.submit_btn} >
                {this.state.is_loading?<ActivityIndicator size="large" color="#193ed1" />:null}
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'#193ed1'}}>Proceed  {' >'} </Text>
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
        backgroundColor: '#193ed1',
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
        
        backgroundColor: '#193ed1'
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
        marginBottom:20
      }
})
export default Buyer