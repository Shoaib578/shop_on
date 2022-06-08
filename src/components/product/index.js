import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {View,Text,StyleSheet,Image,ActivityIndicator} from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import base_url from '../../base_url'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Axios from 'axios'
let name = "DELL VOSTRO LAPTOP PRICES IN PAKISTAN"
export default class Product extends React.Component {
    state = {
        role:'',
        delete_loading:false
    }

   getUserRole =async ()=>{
    const user = await AsyncStorage.getItem("user")
    const parse= JSON.parse(user)
    this.setState({role:parse.role})
   }
   componentDidMount(){
       this.getUserRole()
       console.log(this.props.data)
       this.props.navigation.addListener("focus",()=>{
           this.getUserRole()
       })
   }
   DeleteNewItem = (id)=>{
    this.setState({delete_loading:true})
    Axios.get(base_url+'/apis/item/delete_new_item?item_id='+id)
    .then(res=>{

      this.props.getNewItems()
      
      this.setState({delete_loading:false})

      
    })
    .catch(err=>{
        Alert.alert("Something Went Wrong")
      this.setState({delete_loading:false})

    })

}

   RightAction =(id)=>{
       return(
           <TouchableOpacity disabled={this.state.delete_loading} onPress={()=>this.DeleteNewItem(id)} style={styles.SwipeButton}>
               {this.state.delete_loading?<ActivityIndicator size="small" color="white"/>:null}
               <Text style={{color:'white'}}>Delete</Text>
           </TouchableOpacity>
       )
   }
   
    render(){
        if(this.props.type == 'buyer'){
            return(
                <Swipeable renderRightActions={()=>this.RightAction(this.props.data.item._id)}>

                <View >
    
                
                <TouchableWithoutFeedback style={styles.buyer_item_container} onPress={()=>{
                    if(this.state.role == "supplier"){
                        this.props.navigation.navigate('view_item',{id:this.props.data.item.items[0]._id})
    
                    }else{
                        this.props.navigation.navigate('view_item',{id:this.props.data.item.items[0]._id,new_item_id:this.props.data.item._id})
    
                        
                    }
                }
                }>
                    <Image source={{uri:base_url+'/uploads/'+this.props.data.item.items[0].item_image1}} style={styles.buyer_item_image}/>
                    <View style={{marginLeft:20}}>
                    <Text style={{color:'black',width:'80%'}}>{this.props.data.item.items[0].item_name.substring(0,30)} {this.props.data.item.items[0].item_name.length>30?'....':null}</Text>
                    {this.props.data.item.items[0].sku_code?<Text style={{color:'black',width:'80%',marginTop:10}}>sku: {this.props.data.item.items[0].sku_code.substring(0,15)}{this.props.data.item.items[0].sku_code.length>15?'...':null}</Text>:null}

                    <Text style={{color:'#193ed1',fontWeight:'bold',marginTop:5}}>{this.props.data.item.items[0].price} {this.props.data.item.items[0].currency}</Text>
                    </View>
                   
    
                </TouchableWithoutFeedback>
             
                </View>
                
                </Swipeable>

            )
        }else{
            return(
                <View style={styles.container}>

            
            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('view_item',{id:this.props.data.item._id})}>
                <Image source={{uri:base_url+'/uploads/'+this.props.data.item.item_image1}} style={styles.product_image}/>
                <Text style={{textAlign: 'center',color:'black'}}>{this.props.data.item.item_name}</Text>
                <Text style={{textAlign: 'center',color:'#193ed1',fontWeight:'bold'}}>{this.props.data.item.price} {this.props.data.item.currency}</Text>

            </TouchableWithoutFeedback>
            </View>
            )
        }
        
    }
}

const styles=StyleSheet.create({
    container:{
        width:'45%',
        marginTop:20,
        marginLeft:10
       
    },
    product_image:{
        width:'100%',
        height:220
    },
    buyer_item_container:{
        borderColor:'blue',
        borderWidth:.5,
        borderRadius:10,
        padding:10,
        flexDirection:'row',
        width:'95%',
        alignSelf:'center',
        marginTop:20,
       
    },
    buyer_item_image:{
        width:'60%',
        height:120,
        borderRadius:10
    },
    SwipeButton:{
        borderColor:'red',
        borderWidth:.5,
        borderRadius:10,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        width:200,
        height:'100%',
        marginTop:20,
        flexDirection:'row'
        
       
    }
})