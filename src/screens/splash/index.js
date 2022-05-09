import React from 'react'
import {View,Text} from 'react-native'
import Loading from './loading'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Splash extends React.Component {

    state = {
        isLoggedIn:false,
      
      }

    isLoggedIn = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
      
        if(parse == null){
          this.setState({isLoggedIn:false})
        }else{
          this.setState({isLoggedIn:true})
        }
        
        setTimeout(()=>{
          if(this.state.isLoggedIn){
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'MainNavigator', screen: 'Home' }]
            });
        }else{
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'AuthNavigator', screen: 'signin' }]
            });
        }
        },1000)
        

        
        }

componentDidMount(){
    this.isLoggedIn()

   
 
   
    
}
  
    render(){
        return <Loading />
    }
}