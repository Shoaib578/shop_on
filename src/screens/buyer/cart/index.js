import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ActivityIndicator,Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import base_url from '../../../base_url'
export default class Cart extends React.Component {
    state = {
        carts:[],
        page_loading:true,
        is_loading:false,
        address:''
    }

    getCarts = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/cart/get_cart_items?user_id='+parse._id)
        .then(res=>{
            console.log(res.data.carts)
            this.setState({carts:res.data.carts},()=>{
                this.setState({page_loading:false})
            })
        })
    }

    deleteCart = (id)=>{
        Axios.get(base_url+'/apis/cart/delete?id='+id)
        .then(res=>{
            Alert.alert("Deleted")
            this.getCarts()
        })
        .catch(err=>{
            console.log(err)
            Alert.alert("Something Went Wrong")
        })
    }

    OrderNow = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.address != null){
            this.setState({is_loading:true})
       
            this.state.carts.forEach(cart=>{
                
             
                Axios.post(base_url+'/apis/order/create_order',{
                    "placed_by":parse._id,
                    "placed_for":cart.item_owner,
                    "item_id":cart.item_id,
                    "amount":cart.amount,
                    "cart_id":cart._id,
                    "currency":cart.currency,
                    "size":cart.size,
                    "color":cart.color,
                    "price":parseFloat(cart.item[0].price)*Number(cart.amount),
                    "address":this.state.address
                })
                .then(res=>{
                    if(this.state.carts.indexOf(cart) == this.state.carts.length -1){
                        Alert.alert(res.data.msg)
                        this.setState({is_loading:false})
                        this.getCarts()
                    }
                   
                })
                .catch(err=>{
                    if(this.state.carts.indexOf(cart) == this.state.carts.length -1){
                        Alert.alert("Something Went Wrong")
                        this.setState({is_loading:false})
                    }
                })
            })
        }
      
    }

    componentDidMount(){
        this.getCarts()

        this.props.navigation.addListener("focus",()=>{
            this.getCarts()

        })
    }
    render(){
        if(this.state.page_loading == false){
            if(this.state.carts.length>0){
                return(
                    <View style={styles.container}>
                        <ScrollView >
                           {this.state.carts.map((data,index)=><View key={index} style={styles.item_container}>
                        <Image source={{uri:base_url+'/uploads/'+data.item[0].item_image1}} style={{width:100,borderRadius:10,height:60,}}/>
                        <View style={{marginLeft:20,flexDirection: 'row',flexWrap:'wrap'}}>
                        <TouchableOpacity>
        
                        <Text style={{color:'black',}}>{data.item[0].item_name}</Text>
                        <Text style={{color:'#193ed1',fontWeight:'bold'}}>Total Price : {parseFloat(data.item[0].price)*Number(data.amount)} {data.item[0].currency}</Text>
                        <Text style={{color:'black',fontWeight:'bold'}}>Amount :{data.amount}</Text>
                        <Text style={{color:'black',fontWeight:'bold'}}>Color :{data.color}</Text>
                        <Text style={{color:'black',fontWeight:'bold'}}>Size :{data.size}</Text>
        
        
                        </TouchableOpacity>
        
        
                        <TouchableOpacity onPress={()=>this.deleteCart(data._id)} style={{marginLeft:'70%'}}>
                            <FontAwesome name="trash" color="red" size={20}/>
                        </TouchableOpacity>
        
                        </View>
        
                        </View>)}
                        
                        
                        
                         </ScrollView>
                            
                       
    
                            {this.state.carts.length>0?<View style={styles.text_input}>
                            <TextInput placeholder="Address" value={this.state.address} onChangeText={(val)=>this.setState({address:val})}   placeholderTextColor="black" style={{flex:1,color:'black'}} 
                            />
                            </View>:null}
                            {this.state.carts.length>0?<TouchableOpacity onPress={this.OrderNow} style={styles.submit_btn} >
                         {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}
                            
                            <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Order Now</Text>
                        </TouchableOpacity>:null}
        
        
                    </View>
                    
                )
            }else{
                return <View>
                    <Text style={{color:'red',textAlign:'center',marginTop:30}}>You Dont Have Any Cart Yet!</Text>
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
        width:Dimensions.get('window').width*2/2.5,
        marginTop:20,
        borderRadius:10,
        flexDirection: 'row',
        borderWidth:1,
        padding:10,
        borderColor:"#193ed1",
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
        marginBottom:40
      }
    })