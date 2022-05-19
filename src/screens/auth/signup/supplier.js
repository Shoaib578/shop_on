import React from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity, ActivityIndicator, Alert,StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Axios from 'axios'
import Foundation from 'react-native-vector-icons/Foundation'
import validator from 'validator'
import base_url from '../../../base_url'
class Supplier extends React.Component {
    state = {
        company_name:"",
        company_code:'',
        password:"",
        email:"",
        phone_no:"",
       
        postal_code:"",
        is_loading:false,
        name:'',
        address:'',
        country:'',
        city:'',
        state:''
      
    }

    SignUp = ()=>{
        
        if(validator.isEmail(this.state.email)){
           console.log('valid email')

        }else{
            Alert.alert("Invalid Email")
            return false
        }
        if(this.state.company_name.length<5){
            Alert.alert("Company Name must be at least 5 characters")
            return false

        }

        if(this.state.company_code.includes(' ') || this.state.company_code.length>11 || this.state.company_code.length<2){
            Alert.alert("10 char max, no spaces, no spl char")
            return false
        }

     

        if(validator.isMobilePhone(this.state.phone_no)){
           console.log("valid phone number")
        }else{
            Alert.alert("Invalid Phone Number")
            return false
        }

  
        if(this.state.postal_code.length<1){
            Alert.alert("Please Enter Your Postal Code")
            return false
        }
       
        if(this.state.password.length>4 || this.state.password.length<4){
            Alert.alert("Password Must Be  4 characters")
            return false;
        }
        this.setState({is_loading:true})

        let data = {
            "role":"supplier",
            "phone_no":this.state.phone_no,
            "password":this.state.password,
            "address":this.state.address,
            "city":this.state.city,
            "state":this.state.state,
            "country":this.state.country,
            "company_name":this.state.company_name,
            "company_code":this.state.company_code,
            "postal_code":this.state.postal_code,
            "name":this.state.name,
            "email":this.state.email
        }
        Axios.post(base_url+"/apis/user/sign_up",data)
        .then(res=>{
           Alert.alert(res.data.msg)
           this.setState({ company_name:"",
           company_code:'',
           password:"",
           email:"",
           phone_no:"",
          
           postal_code:"",
           is_loading:false,
           name:'',
           address:'',
           country:'',
           city:'',
           state:''})
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({is_loading:false})
        })

      
        
    }
    render(){
        return(
            <ScrollView style={styles.SignupSellerContainer}>
            <SafeAreaView style={{alignItems: 'center',alignSelf: 'center',}}>
            <Text style={{color:'white',fontSize:18,marginTop:Dimensions.get('window').height*2/16,}}>Create  Your Account</Text>
            <View style={styles.text_input}>
                <Feather name="user" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Name" value={this.state.name} selectionColor="white"  placeholderTextColor="#DBDBDB" onChangeText={(val)=>this.setState({name:val})} style={{flex:1,color:'white'}} 
                />
                </View>
            <View style={styles.text_input}>
            <Foundation name="torso-business" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Company Name"  onChangeText={(val)=>this.setState({company_name:val})} value={this.state.company_name} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>

            <View style={styles.text_input}>
            <Foundation name="torso-business" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Company Code"  onChangeText={(val)=>this.setState({company_code:val})} value={this.state.company_code} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>
           

            <View style={styles.text_input}>
            <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Phone" selectionColor="white" onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.phone_no}  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>



            <View style={styles.text_input}>
            <Feather name="mail" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="Email"  selectionColor="white" value={this.state.email} onChangeText={(val)=>this.setState({email:val})} placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>


            <View style={styles.text_input}>
            <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput placeholder="4 digit numeric pin" value={this.state.password} secureTextEntry onChangeText={(val)=>this.setState({password:val})} selectionColor="white" placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
            />
            </View>

         


                <View style={styles.text_input}>
                <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput  placeholder="Address" value={this.state.address} selectionColor="white" onChangeText={(val)=>this.setState({address:val})} placeholderTextColor="white" style={{flex:1,color:'white'}} 
                />
                </View>


                <View style={styles.text_input}>
                <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput  placeholder="City" value={this.state.city} selectionColor="white" onChangeText={(val)=>this.setState({city:val})} placeholderTextColor="white" style={{flex:1,color:'white'}} 
                />
                </View>


                <View style={styles.text_input}>
                <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput  placeholder="State" value={this.state.state} selectionColor="white" onChangeText={(val)=>this.setState({state:val})} placeholderTextColor="white" style={{flex:1,color:'white'}} 
                />
                </View>



                <View style={styles.text_input}>
                <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput  placeholder="Country" value={this.state.country} selectionColor="white" onChangeText={(val)=>this.setState({country:val})} placeholderTextColor="white" style={{flex:1,color:'white'}} 
                />
                </View>



           

            {/* <View style={{ borderWidth:1,borderColor:'white',borderRadius:5,marginTop:20,width:Dimensions.get('window').width*2/2.5,height:50}}>

                <Picker

                selectedValue={this.state.make_your_product_visible_to_everyone}
                onValueChange={(val)=>{this.setState({make_your_product_visible_to_everyone:val})}}
                style={{color:'white'}}
                mode="dropdown">
                <Picker.Item label="Make Your Product Visible To Every One" value='' />

                <Picker.Item label="Yes" value={1} />
                <Picker.Item label="No" value={0} />
                

              

                </Picker>

                </View> */}

            <View style={styles.text_input}>
            <Entypo name="location-pin" style={styles.phoneImageStyle} color="white" size={25}/>
            <TextInput  placeholder="Postal" value={this.state.postal_code} selectionColor="white"  onChangeText={(val)=>this.setState({postal_code:val})}  placeholderTextColor="white" style={{flex:1,color:'white'}} 
            />
            </View>




            <TouchableOpacity disabled={this.state.is_loading} onPress={this.SignUp} style={[styles.submit_btn,{marginBottom:20}]} >
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
export default Supplier