import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ActivityIndicator} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import base_url from '../../../base_url'
import ReceivedOrderContainer from './ReceivedorderContainer'
export default class ReceivedOrders extends React.Component {
    state = {
        data:[],
        is_loading:true
    }

    getOrders = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/order/received_orders?user_id='+parse._id)
        .then(res=>{
            console.log(res.data.orders)
            this.setState({data:res.data.orders},()=>{
                this.setState({is_loading:false})
            })
        })
    }
     componentDidMount(){
         this.getOrders()
         this.props.navigation.addListener("focus",()=>{
            this.getOrders()

    
    
          })
     }
    render(){
        if(this.state.is_loading == false){
            if(this.state.data.length>0){
                return (
                    <View style={styles.container}>
                       <ScrollView showsVerticalScrollIndicator={false}>
                           {this.state.data.map((data,index)=>(
                           <ReceivedOrderContainer navigation={this.props.navigation} getOrders={this.getOrders} data={data} key={index}/>

                           ))}
                          
        
                       </ScrollView>
                    </View>
                )
            }else{
                return <View>
                    <Text style={{color:'red',textAlign:'center',fontWeight:'bold',marginTop:20}}>Dont Have Any Orders Yet!</Text>
                </View>
            }
          
        }else{
            return <ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>
        }
       
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
       
    },
    
    })