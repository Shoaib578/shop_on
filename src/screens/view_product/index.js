

import React from 'react'
import {View,Text,Dimensions,TextInput, ActivityIndicator, Alert,StyleSheet} from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import ReadMore from '@fawazahmed/react-native-read-more';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios';
import base_url from '../../base_url';
import {Picker} from '@react-native-picker/picker';

const {width} = Dimensions.get('window');
const height = width*100/180
class ViewProduct extends React.Component {
    state = {
        is_favorite:false,
        role:'',
        data:[],
        isLoading:false,
        cart_loading:false,
        quantity:0,
        quantit_btn_available:false,
        page:0,
        my_id:'',
        color:'',
        size:''
    }

   
    ViewItem = ()=>{
        Axios.get(base_url+'/apis/item/view_item?item_id='+this.props.route.params.id)
        .then(res=>{
            console.log(res.data.item)
            this.setState({data:res.data.item})
        })
    }
   
    addToCart = async()=>{
        const user= await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.color == null || this.state.size == null || this.state.quantity == null){
            Alert.alert("Fields are required")
            return false
        }else{
            this.setState({cart_loading:true})
        let data = {
            "cart_user":parse._id,
            "item_id":this.props.route.params.id,
            "currency":this.state.data.currency,
            "item_owner_id":this.state.data.added_by,
            "amount":this.state.quantity,
            "size":this.state.size,
            "color":this.state.color
        }
        Axios.post(base_url+"/apis/cart/add_cart",data)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.setState({cart_loading:false})

        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        this.setState({cart_loading:false})

        })
        }

        
        
    }

 
    getUserRole = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({role:parse.role})
    }
  
    componentDidMount(){
        this.getUserRole()
        .then(()=>{
            this.ViewItem()

        })
    }

    render(){
        if(this.state.isLoading == false){
          
                return <View>

              
                   
                    <ScrollView >
                    <SliderBox
                    images={[
                        {uri:base_url+'/uploads/'+this.state.data.item_image1},
                        {uri:base_url+'/uploads/'+this.state.data.item_image2},
                        {uri:base_url+'/uploads/'+this.state.data.item_image3},

    
                    ]}
                    dotColor="black"
                    sliderBoxHeight={height}
                    onCurrentImagePressed={index =>
                        console.warn(`image ${index} pressed`)
                    }
                    autoplay
                    circleLoop
                    parentWidth={width}
                    />
    
              
                
    
              
    
    
                   
                    <Text style={{fontSize:18,fontWeight:'bold',color:'black',padding:10,marginLeft:7}}>{this.state.data.item_name}</Text>
    
                   
    
                    <View style={{ marginLeft:Dimensions.get('window').width*2/40 }}>
                    <Text style={{ fontWeight:'bold',fontSize:16 }}>Details</Text>
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Price</Text>
                    <Text style={{ right:20,fontSize:15 }}>{this.state.data.price}{this.state.data.currency}</Text>
                    </View>
    
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>SKU Code</Text>
                    <Text style={{ right:20,fontSize:15 }}>{this.state.data.sku_code} </Text>
                    </View>
    
                  


                  


                  </View>
                    
    
                    <View style={{padding:15,width:'95%'}}>
                    <Text style={{fontWeight:'bold',color:'#57b5b6'}}>Description : </Text>
                    <ReadMore numberOfLines={3} seeMoreStyle={{color:'#57b5b6'}} seeLessStyle={{color:'#57b5b6'}} style={{fontSize:14}}>
                   
                        {this.state.data.item_description}
                   
                    </ReadMore>
                    </View>
                    
    
                   
                    {this.state.role == "buyer"?<View>

                    <Text style={{marginLeft:10}}>Quantity*</Text>
    
                   <View style={styles.text_input}>
                    <TextInput placeholder="" value={this.state.quantity.toString()} onChangeText={(val)=>this.setState({quantity:val})} keyboardType="numeric"  placeholderTextColor="black" style={{flex:1,color:'black'}} 
                    />
                    </View>
                    <Text style={{marginLeft:10,top:10}}>Color*</Text>

                    <View style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:'95%',marginTop:20,alignSelf:'center',height:50 }}>
                <Picker

                selectedValue={this.state.color}
                onValueChange={(val)=>{this.setState({color:val})}}

                mode="dropdown">
                <Picker.Item label="Select Color"  value=" " />

                {this.state.data.colors?this.state.data.colors.split(",").map((data,index)=>{
                  
                return <Picker.Item label={data} key={index} value={data} />

                }):null}




                </Picker>

                </View>


                    <Text style={{marginLeft:10,top:10}}>Size*</Text>

                    <View style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:'95%',marginTop:20,height:50,alignSelf:'center' }}>
                <Picker

                selectedValue={this.state.size}
                onValueChange={(val)=>{this.setState({size:val})}}

                mode="dropdown">
                <Picker.Item label="Select Size"  value=" " />

                {this.state.data.sizes?this.state.data.sizes.split(",").map((data,index)=>{
                  
                return <Picker.Item label={data} key={index} value={data} />

                }):null}




                </Picker>

                </View>
    
                    <TouchableOpacity disabled={this.state.cart_loading} onPress={this.addToCart} style={[styles.profile_screen_card,{backgroundColor:'#57b5b6',marginBottom:50}]} >
                   
                    {this.state.cart_loading?<ActivityIndicator size="large" color="#193ed1" />:null}
                   
                    <View style={{flexDirection:'row'}}>
                    <FontAwesome name="shopping-cart" size={25} color="white" style={{marginLeft:'5%'}}/>
                            
                            <Text style={{ fontSize:16,fontWeight:'bold',color:'white',marginLeft:'5%'}}>Add To Cart</Text>
                    </View>
                   
                    </TouchableOpacity>
                    </View>:null}
                </ScrollView>

         
               
          
            </View>
           
         
       
    }else{
        return(
            <ActivityIndicator size="large" color="#57b5b6" style={{alignSelf:'center',marginTop:50}}/>
        )
    }

    }
}

export default ViewProduct

const styles = StyleSheet.create({
    text_input:{
    
        borderWidth:1,
        borderColor:"#57b5b6",
        color:"black",
        alignSelf:'center',
        borderRadius:5,
        height:50,
        width:'95%',
        marginTop:20,
      },
      profile_screen_card:{
        justifyContent:'center',
        borderWidth:1,
        borderColor:'white',
        padding:10,
        width:'97%',
        backgroundColor:'white',
        marginTop:20,
        alignSelf: 'center',
        alignItems:'center',
        borderRadius:5 ,
        flexDirection:'row',
        paddingLeft:10,
    },
})
