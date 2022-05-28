import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import BuyerProfile from './buyer_profile';
import SupplierProfile from './supplier_profile';
import {ActivityIndicator,View} from 'react-native'
class Profile extends React.Component {
    state = {
        is_loading:true,
        role:''
    }
  getUserRole = async()=>{
      const user = await AsyncStorage.getItem("user")
      const parse = JSON.parse(user)
      this.setState({role:parse.role},()=>{
          this.setState({is_loading:false})
      })
  }

  componentDidMount(){
      this.getUserRole()
  }
   
    render(){
        if(this.state.is_loading == false){
            if(this.state.role == "buyer"){
                return <BuyerProfile />
    
            }else{
                return <SupplierProfile />
            }
        }else{
            return <ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>
        }
        
    }
}


export default Profile