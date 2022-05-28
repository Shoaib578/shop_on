import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import React from 'react'
import {View,Text, StyleSheet,ImageBackground,Dimensions,Image,ScrollView,Alert,ActivityIndicator} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import base_url from '../../../base_url'

export default class Orders extends React.Component {
    state = {
        data:[],
        is_loading:true
    }

    getOrders = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/order/my_orders?user_id='+parse._id)
        .then(res=>{
            console.log(res.data.orders)
            this.setState({data:res.data.orders},()=>{
                this.setState({is_loading:false})
            })
        })
    }
    completeOrder = (order_id,status)=>{
      
        const data = {
            "order_id":order_id,
            "status":status
        }   
        Axios.post(base_url+'/apis/order/change_order_status',data)
        .then(res=>{
            Alert.alert("Order Completed")
            this.getOrders()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
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
                return <ScrollView style={styles.container}>
                {this.state.data.map((order,index)=>{
                    return  <View key={index} style={styles.orderCard}>
    
                    <Image source={{uri:base_url+'/uploads/'+order.item[0].item_image1}} style={{width:'100%',height:150,borderRadius:10,}}/>
                    <View style={styles.status}><Text style={styles.statusText}>{order.status}</Text></View>
                       
        
                      
                    <View style={{ marginLeft:Dimensions.get('window').width*2/40,marginTop:10 }}>
                   <Text style={{ fontWeight:'bold',fontSize:16 }}>Details</Text>
   
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Total Price</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{order.price}{order.currency}</Text>
                   </View>
   
   
   
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Amount</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{order.amount} </Text>
                   </View>
   
                 
                   

                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Size</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{order.size} </Text>
                   </View>


                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Colour</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{order.color} </Text>
                   </View>

                 
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Ordered From</Text>
                   <TouchableOpacity onPress={()=>this.props.navigation.navigate("view_supplier",{id:order.user[0]._id})} >
                   <Text style={{ fontSize:15,color:'blue',fontWeight:'bold' }}>{order.user[0].supplier.company_name} </Text>

                   </TouchableOpacity>
                   </View>



                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Address</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{order.address} </Text>
                   </View>

                 </View>
                        {order.status == 'onway'?
                        <TouchableOpacity onPress={()=>this.completeOrder(order._id,'completed')} style={styles.submit_btn} >
                        
                           
                           <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Complete</Text>
                       </TouchableOpacity>
                        
                        :null}
                    </View>
                })}
               
            </ScrollView>
            }else{
                return <Text style={{textAlign:'center',color:'red',fontWeight:'bold',marginTop:30}}>You Dont Have Any Orders Yet!</Text>
            }
          
        }else{
            return <ActivityIndicator size="large" color="black" style={{alignSelf:"center",marginTop:30}}/>
        }
       
    }
}

const styles = StyleSheet.create({
    container:{
       flex:1,
        alignitems: 'center'
    },

    orderCard:{
        width:Dimensions.get('window').width*2/2.2,
        marginTop:20,
        borderRadius:10,
       
        borderWidth:1,
        alignSelf:'center',
        borderColor:"#193ed1",
        marginBottom:20,
        paddingBottom:10
    },

  

    productImage:{
        width:'100%',
        height:'100%',
        flex:1,
        alignItems:'flex-end'
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

    ProductInfo:{
        paddingLeft:'5%',
        paddingTop:'5%'
    },

    ProductTitle:{
        fontSize:18,
        fontWeight:'bold',
    },

    ProductPrice:{
        fontSize:18,
        marginTop:'1%',
        fontWeight:'bold',
    },

    OrderFrom:{
        fontSize:18,
        marginTop:'1%',
        fontWeight:'bold',
    },
    submit_btn:{
        
          borderWidth:1,
          borderColor:"green",
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'green',
          borderRadius:10,
          height:50,
          width:'100%',
          marginTop:20,
          
        }
})