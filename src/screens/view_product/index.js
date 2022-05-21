

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

const {width} = Dimensions.get('window');
const height = width*100/180
class ViewProduct extends React.Component {
    state = {
        is_favorite:false,
       
        data:[],
        isLoading:false,
        quantity:0,
        quantit_btn_available:false,
        page:0,
        my_id:'',
    }

   
    ViewItem = ()=>{
        Axios.get(base_url+'/apis/item/view_item?item_id='+this.props.route.params.id)
        .then(res=>{
            
            this.setState({data:res.data.item})
        })
    }
   


  
    componentDidMount(){
        this.ViewItem()
    }

    render(){
        if(this.state.isLoading == false){
          
                return <View>

              
                   
                    <ScrollView >
                    <SliderBox
                    images={[
                        {uri:base_url+'/uploads/'+this.state.data.item_image1},
                        {uri:base_url+'/uploads/'+this.state.data.item_image2},
                        {uri:"https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=763&q=80"},

    
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
    
              
                
    
              
    
    
                   
                    <Text style={{fontSize:18,fontWeight:'bold',color:'black',padding:10,marginLeft:7}}>New Bag</Text>
    
                   
    
                    <View style={{ marginLeft:Dimensions.get('window').width*2/40 }}>
                    <Text style={{ fontWeight:'bold',fontSize:16 }}>Details</Text>
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Price</Text>
                    <Text style={{ right:20,fontSize:15 }}>20$</Text>
                    </View>
    
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>SKU Code</Text>
                    <Text style={{ right:20,fontSize:15 }}>23asd </Text>
                    </View>
    
    
                    <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
                    <Text style={{ fontSize:15 }}>Colours</Text>
                    <Text style={{ right:20,fontSize:15 }}>blue, green, yellow</Text>
                    </View>


                  </View>
                    
    
                    <View style={{padding:15,width:'95%'}}>
                    <Text style={{fontWeight:'bold',color:'#57b5b6'}}>Description : </Text>
                    <ReadMore numberOfLines={3} seeMoreStyle={{color:'#57b5b6'}} seeLessStyle={{color:'#57b5b6'}} style={{fontSize:14}}>
                    {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    }
                    </ReadMore>
                    </View>
                    
    
                   


                    <Text style={{marginLeft:10}}>Quantity*</Text>
    
                   <View style={styles.text_input}>
                    <TextInput placeholder="" value={this.state.quantity.toString()} onChangeText={(val)=>this.setState({quantity:val})} keyboardType="numeric"  placeholderTextColor="black" style={{flex:1,color:'black'}} 
                    />
                    </View>
    
                    <TouchableOpacity disabled={this.state.quantit_btn_available} style={[styles.profile_screen_card,{justifyContent:'center',backgroundColor:'#57b5b6',marginBottom:50}]} >
                    <FontAwesome name="shopping-cart" size={25} color="white" style={{marginLeft:'5%'}}/>
                            
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white',marginLeft:'5%'}}>Add To Cart</Text>
                    </TouchableOpacity>
    
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
