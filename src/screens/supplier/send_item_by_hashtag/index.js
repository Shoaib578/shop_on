import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator,Dimensions ,Button,TouchableOpacity,TouchableWithoutFeedback,Image} from 'react-native'
import { ScrollView,FlatList } from 'react-native-gesture-handler'
import {Picker} from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'


export default class SendItemByHashTag extends React.Component{
    state = {
        hash_tag:'',
        hash_tags:[],
        data:[],
       
    }


    SearchProductByHashTag = async(hash_tag)=>{

        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({is_loading:true})
        Axios.get(base_url+'/apis/item/search_item_by_hashtag?hash_tag='+hash_tag+'&&user_id='+parse._id)
        .then(res=>{
            this.setState({data:res.data.items},()=>{
                this.setState({is_loading:false})
            })
        })

    }

    getHashTags = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/hash_tag/get_hashtags?user_id='+parse._id)
        .then(res=>{
          console.log(res.data.hash_tags)
          this.setState({hash_tags:res.data.hash_tags})
        })
      }

      choose_user = ()=>{
          let all_ids = []
          this.state.data.forEach(data=>{
              all_ids.push(data._id)
          })

            this.props.navigation.navigate('select_user',{id:all_ids})
      }
      componentDidMount(){
          this.getHashTags()
      }
    render(){
        return(
            <View style={styles.container}>
        <View style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.4,height:50 }}>
            <Picker

            selectedValue={this.state.hash_tag}
            onValueChange={(val)=>{
                this.setState({hash_tag:val})
                this.SearchProductByHashTag(val)
            
            }
                
            }

            mode="dropdown">
            <Picker.Item label="Select HashTag"  value=" " />

            {this.state.hash_tags.map((data,index)=>{
              
            return <Picker.Item label={data.hash_tag} key={index} value={data.hash_tag} />

            })}
           

            

            </Picker>
            
            </View>


            <TouchableOpacity onPress={()=>this.choose_user()} style={styles.submit_btn} >
                        
                            
                        <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Choose Users</Text>
                    </TouchableOpacity>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
        alignItems:'center',
        flex:1,
        padding:15 
    },
    submit_btn:{
            marginTop:'90%',
          borderWidth:1,
          borderColor:"#193ed1",
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'#193ed1',
          borderRadius:10,
          height:50,
          width:Dimensions.get('window').width*2/2.5,
         
          marginBottom:40
        },
        product_image:{
            width:'100%',
            height:220
        }
})