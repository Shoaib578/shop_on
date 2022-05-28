import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator,Dimensions} from 'react-native'
import { ScrollView,FlatList } from 'react-native-gesture-handler'
import {Picker} from '@react-native-picker/picker';

import SendItemProduct from '../../../components/sendItemProduct'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'
import  Contact  from 'react-native-contacts';
export default class SendItem extends React.Component {
    state = {
        role:'',
        data:[],
        is_loading:true,
        hash_tags:[],
        hash_tag:''
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

    getSupplierItems = async()=>{
        const user= await AsyncStorage.getItem("user")
        const parse= JSON.parse(user)
        Axios.get(base_url+'/apis/item/get_supplier_items?user_id='+parse._id)
        .then(res=>{
            console.log(res.data.items)
            this.setState({data:res.data.items},()=>{
                this.setState({is_loading:false})
            });
        })

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

    Refresh = async()=>{
        this.setState({is_loading:true})

        let role =await this.getUserRole()
        if(role == "supplier"){
            this.getSupplierItems()
        }else{
            this.getNewItems()
        }
    }
    getContacts = ()=>{
        Contact.getAll()
        .then(res=>{
            console.log(res)
        })
    }
    componentDidMount(){
            
        
            this.getHashTags()
            this.getSupplierItems()
   }

    render(){
        return (
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
            
            {this.state.is_loading == false?<FlatList data={this.state.data} 
            numColumns={2}
            keyExtractor={(item) => item._id}
            
            refreshing={this.state.is_loading}
             onRefresh={()=>this.Refresh()}
            
            
            renderItem={(data)=>(
               <SendItemProduct data={data} navigation={this.props.navigation}/>

              

            )}
            
            />:<ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>}
            </View>
     
        )
    }
}


const styles = StyleSheet.create({
    container: {
        
        alignItems:'center',
      
        padding:15 
    }
})