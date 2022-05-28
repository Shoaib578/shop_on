import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import React from 'react'
import {View,Text, StyleSheet,ImageBackground,Dimensions,Image,ActivityIndicator} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import base_url from '../../../base_url'

export default class OrdersHistory extends React.Component {
    	state = {
            is_loading:true,
            data:[],
            role:''
        }


        getUserRole = async()=>{
            const user = await AsyncStorage.getItem("user")
            const parse = JSON.parse(user)
            this.setState({role:parse.role})
        }
        getOrderHistoryAsBuyer = async()=>{
            const user = await AsyncStorage.getItem("user")
            const parse =  JSON.parse(user)
           


            Axios.get(base_url+'/apis/order/order_history_as_buyer?user_id='+parse._id)
            .then(res=>{
                this.setState({data:res.data.orders},()=>{
                    this.setState({is_loading:false})
                })
            })

        }


        getOrderHistoryAsSupplier = async()=>{
            const user = await AsyncStorage.getItem("user")
            const parse =  JSON.parse(user)
          


            Axios.get(base_url+'/apis/order/order_history_as_supplier?user_id='+parse._id)
            .then(res=>{
                this.setState({data:res.data.orders},()=>{
                    this.setState({is_loading:false})
                })
            })

        }


        getOrderHistory = ()=>{
            
            if(this.state.role == "buyer"){
                this.getOrderHistoryAsBuyer()
            }else{
                this.getOrderHistoryAsSupplier()
            }

        }

        componentDidMount(){
            this.getUserRole()
            .then(()=>{
                this.getOrderHistory()

            })

            this.props.navigation.addListener("focus",()=>{
                this.getUserRole()
                .then(()=>{
                    this.getOrderHistory()
    
                })
    
        
        
              })
        }
    render(){
        if(this.state.is_loading == false){

        return <ScrollView style={styles.container}>
           {this.state.data.length>0?this.state.data.map((order,index)=>{
                return  <View key={index} style={styles.orderCard}>

                <Image source={{uri:base_url+'/uploads/'+order.item[0].item_image1}} style={{width:'100%',height:150,borderRadius:10,}}/>
                <View style={styles.status}><Text style={styles.statusText}>{order.status}</Text></View>
                <Text style={{ fontWeight:'bold',fontSize:16,color:'black',marginLeft:20 }}>{order.item[0].item_name}</Text>
                   
                   
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

                   {this.state.role == 'buyer'?
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Ordered From</Text>
                   <TouchableOpacity onPress={()=>this.props.navigation.navigate("view_supplier",{id:order.user[0]._id})} >
                   <Text style={{ fontSize:15,color:'blue',fontWeight:'bold' }}>{order.user[0].supplier.company_name} </Text>

                   </TouchableOpacity>
                   </View>:
                   
                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Ordered By</Text>
                   <TouchableOpacity onPress={()=>this.props.navigation.navigate("view_buyer",{id:order.user[0]._id})} >
                   <Text style={{ fontSize:15,color:'blue',fontWeight:'bold' }}>{order.user[0].buyer.name} </Text>

                   </TouchableOpacity>
                   </View>
                   
                   }



                   <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                   <Text style={{ fontSize:15 }}>Address</Text>
                   <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{order.address} </Text>
                   </View>

                 </View>

    
                  
                   
                    
                </View>
            }):<View>
                <Text style={{textAlign:'center',marginTop:30,fontWeight:'bold',color:'red'}}>You have no orders history yet!</Text>
                </View>}
        </ScrollView>
        }else{
            return <ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>
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
        backgroundColor:'green',
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
        color:'black',
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
        color:'blue'
    }

})