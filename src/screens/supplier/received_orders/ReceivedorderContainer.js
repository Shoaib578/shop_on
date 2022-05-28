import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import base_url from '../../../base_url'
import Axios from 'axios'

export default class ReceivedOrderContainer extends React.Component{
  ChangeStatus = (order_id,status)=>{
      
    const data = {
        "order_id":order_id,
        "status":status
    }   
    Axios.post(base_url+'/apis/order/change_order_status',data)
    .then(res=>{
        Alert.alert(res.data.msg)
        this.props.getOrders()
    })
    .catch(err=>{
        Alert.alert("Something Went Wrong")
    })
  }
    render(){
        return(
            <View style={styles.item_container}>
                    <Image source={{uri:base_url+'/uploads/'+this.props.data.item[0].item_image1}} style={{width:'100%',height:150,borderRadius:10}}/>
                    <View style={styles.status}><Text style={styles.statusText}>{this.props.data.status}</Text></View>
                   
                    <Text style={{ fontWeight:'bold',fontSize:16,color:'black',marginLeft:20 }}>{this.props.data.item[0].item_name}</Text>
                   
                   
                    <View style={{ marginLeft:Dimensions.get('window').width*2/40,marginTop:10 }}>
                    <Text style={{ fontWeight:'bold',fontSize:16 }}>Details</Text>
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Total Price</Text>
                    <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.props.data.price}{this.props.data.currency}</Text>
                    </View>
    
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Amount</Text>
                    <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.props.data.amount} </Text>
                    </View>
    
                  
                    

                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Size</Text>
                    <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.props.data.size} </Text>
                    </View>


                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Colour</Text>
                    <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.props.data.color} </Text>
                    </View>


                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Ordered By</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("view_buyer",{id:this.props.data.user[0]._id})} >
                    <Text style={{ fontSize:15,color:'blue',fontWeight:'bold' }}>{this.props.data.user[0].buyer.name} </Text>

                    </TouchableOpacity>
                    </View>



                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Address</Text>
                    <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.props.data.address} </Text>
                    </View>

                  </View>


                   
                  
                    {this.props.data.status == 'accepted'?<TouchableOpacity onPress={()=>this.ChangeStatus(this.props.data._id,"onway")} style={styles.submit_btn1} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>On Way</Text>
                </TouchableOpacity>:null}


                    {this.props.data.status == 'pending'?<TouchableOpacity onPress={()=>this.ChangeStatus(this.props.data._id,"accepted")} style={styles.submit_btn1} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Accept</Text>
                </TouchableOpacity>:null}

                {this.props.data.status == 'pending'? <TouchableOpacity onPress={()=>this.ChangeStatus(this.props.data._id,"rejected")} style={styles.submit_btn2} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Reject</Text>
                </TouchableOpacity>:null}

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
        width:Dimensions.get('window').width*2/2.2,
        marginTop:20,
        borderRadius:10,
       
        borderWidth:1,
       
        borderColor:"#193ed1",
        marginBottom:20
      },
      submit_btn1:{
      
        borderWidth:1,
        borderColor:"green",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'green',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.2,
        marginTop:20,
        alignSelf: 'center',
       
      },
      submit_btn2:{
      
        borderWidth:1,
        borderColor:"red",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'red',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.2,
        marginTop:5,
        alignSelf: 'center',
       
      },
      status:{
        left:'75%',
        marginTop:5,
        backgroundColor:'orange',
        padding:3,
        borderRadius:10,
        position:'absolute'
    },

    statusText:{
        fontSize:16,
        fontWeight:'bold',
    },
    })
