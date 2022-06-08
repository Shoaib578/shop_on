import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator,Dimensions ,Button,TouchableOpacity,TouchableWithoutFeedback,Image} from 'react-native'
import { ScrollView,FlatList } from 'react-native-gesture-handler'
import {Picker} from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'

let all_ids = []

export default class SendItemByHashTag extends React.Component{
    state = {
        hash_tag:'',
        hash_tags:[],
        data:[],
        is_loading:true,
        selected_items:[]
       
    }


    SearchProductByHashTag = async(hash_tag)=>{

        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({is_loading:true})
        Axios.get(base_url+'/apis/item/search_item_by_hashtag?hash_tag='+hash_tag+'&&user_id='+parse._id)
        .then(res=>{
            
            this.setState({data:res.data.items})


            this.state.data.forEach(data=>{
                console.log(data)
                all_ids.push(data._id)
                this.setState({is_loading:false})
                this.setState({selected_items:all_ids})
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
      select_item = (id)=>{
        console.log(id)
        let exist = all_ids.includes(id)
        if(exist){
            all_ids.filter(i=>{
                if(i==id){
                    all_ids.splice(all_ids.indexOf(i),1)
                 this.setState({selected_items:all_ids})
                  
                }
            })
            return false

        }else{
            all_ids.push(id)
          
            this.setState({selected_items:all_ids})
            return true
        }

    }


      choose_user = ()=>{
          this.state.data.forEach(data=>{
              all_ids.push(data._id)
          })

            this.props.navigation.navigate('select_user',{id:all_ids})
      }
      componentDidMount(){
          this.getHashTags()
          this.SearchProductByHashTag('')
          .then(res=>{
              this.setState({is_loading:false})
          })


          this.props.navigation.addListener("focus",()=>{
            this.getHashTags()
            this.SearchProductByHashTag('')
            .then(res=>{
                this.setState({is_loading:false})
            })
          })
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

         

            {this.state.is_loading == false?<FlatList data={this.state.data} 
            numColumns={2}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
           
            
           
            
            renderItem={(item)=>{

                return <View style={{ width:'45%', marginTop:20,
                marginLeft:10}}>
                <TouchableOpacity  style={{borderColor:this.state.selected_items.includes(item.item._id)?'red':'white',borderWidth:1,width:'100%'}} onPress={()=>this.select_item(item.item._id)}>
                <Image source={{uri:base_url+'/uploads/'+item.item.item_image1}} style={styles.product_image}/>
                <Text style={{textAlign: 'center',color:'black'}}>{item.item.item_name}</Text>
                <Text style={{textAlign: 'center',color:'#193ed1',fontWeight:'bold'}}>{item.item.price} {item.item.currency}</Text>
                
            </TouchableOpacity>
            </View>

              

            }}
                

            
            />:<ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>}

            <Text style={{marginTop:140}}> </Text>
              <TouchableOpacity onPress={()=>this.choose_user()} style={styles.submit_btn} >
                        
                            
                        <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Choose Users</Text>
                    </TouchableOpacity>
         
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        
        padding:15 
    },
    submit_btn:{
        position:'absolute',
        top:'90%',
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