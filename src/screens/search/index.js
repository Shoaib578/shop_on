import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ActivityIndicator} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import base_url from '../../base_url'
export default class Search extends React.Component {
    state = {
        search:'',
        data:[],
        is_loading:false
    }

    search_item = async(search)=>{
      const user = await AsyncStorage.getItem("user")
      const parse = JSON.parse(user)
      this.setState({is_loading:true})
      Axios.get(base_url+'/apis/item/search_item?user_phone_number='+parse.phone_no+'&&search='+search)
      .then(res=>{
        this.setState({data:res.data.items},()=>{
          this.setState({is_loading:false})
        })
      })

    }
    render(){
        return(
            <View style={styles.container}>
                 <View style={styles.text_input}>
                <Feather name="search" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="search Item"  selectionColor="white" onChangeText={async(val)=>{
                  if(val.length>0){
                    await this.search_item(val)

                  }

                }}  placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>

                <ScrollView>
                {this.state.is_loading == false?this.state.data.map((item,index)=>{return<TouchableOpacity onPress={()=>this.props.navigation.navigate('view_item',{id:item.items[0]._id})} key={index} style={styles.item_container}>
                <Image source={{uri:base_url+'/uploads/'+item.items[0].item_image1}} style={{width:100,borderRadius:10,height:60,}}/>
                <View style={{marginLeft:20}}>
                <Text style={{color:'black'}}>{item.items[0].item_name}</Text>
                <Text style={{color:'#193ed1',fontWeight:'bold'}}>${item.items[0].price}</Text>
                </View>
                </TouchableOpacity>
              }):<ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>}
                  <View style={{marginTop:50}}>
                    <Text></Text>
                  </View>
                </ScrollView>
               


                


               


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
    width:Dimensions.get('window').width*2/2.5,
    marginTop:20,
    borderRadius:10,
    flexDirection: 'row',
    borderWidth:1,
    padding:10,
    borderColor:"#193ed1",
  }
})