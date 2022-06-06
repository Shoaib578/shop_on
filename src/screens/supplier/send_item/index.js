import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator,Dimensions ,Button,TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,TextInput,Image,PermissionsAndroid } from 'react-native'
import { ScrollView,FlatList } from 'react-native-gesture-handler'
import {Picker} from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'


let s_items = []

export default class SendItem extends React.Component {
    state = {
        role:'',
        data:[],
        is_loading:true,
        hash_tags:[],
        selected_items:[],
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

    search_item_by_name_sku = async(value)=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({is_loading:true})
        Axios.get(base_url+'/apis/item/search_item_by_sku_or_name?search='+value+'&&user_id='+parse._id)
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
    select_item = (id)=>{
        console.log(id)
        let exist = s_items.includes(id)
        if(exist){
            s_items.filter(i=>{
                if(i==id){
                    s_items.splice(s_items.indexOf(i),1)
                 this.setState({selected_items:s_items})
                  
                }
            })
            return false

        }else{
            s_items.push(id)
           console.log(s_items)
            this.setState({selected_items:s_items})
            return true
        }

    }
  
    componentDidMount(){
        this.getHashTags()
            this.getSupplierItems()
        this.props.navigation.addListener("focus",()=>{
            this.getHashTags()
            this.getSupplierItems()
        })
            
   }

    render(){
        return (
            <View style={styles.container}>

                   <TouchableOpacity onPress={()=>this.props.navigation.navigate('send_item_by_hashtag')} style={{marginLeft:'35%', borderWidth:1,
                    borderColor:"#193ed1",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:'#193ed1',
                    borderRadius:10,
                    height:50,
                    width:200,
         
          marginBottom:40}}>
                    <Text style={{color:'white'}}>Send By Hash Tag</Text>
                   </TouchableOpacity>



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
            
            <View style={styles.text_input}>
                <Feather name="search" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="search Item by sku or item name"  selectionColor="white" onChangeText={(val)=>{
                    if(val.length>0){
                        this.search_item_by_name_sku(val)
                    }else{
                        this.getSupplierItems()
                    }
                }}  placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>


            {this.state.is_loading == false?<FlatList data={this.state.data} 
            numColumns={2}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            refreshing={this.state.is_loading}
             onRefresh={()=>this.Refresh()}
           
            
            renderItem={(data)=>(
                <View style={{ width:'45%',
                marginTop:20,
                marginLeft:10}}>
                <TouchableOpacity style={{borderColor:this.state.selected_items.includes(data.item._id)?'red':'white',borderWidth:1}} onPress={()=>this.select_item(data.item._id)}>
                <Image source={{uri:base_url+'/uploads/'+data.item.item_image1}} style={styles.product_image}/>
                <Text style={{textAlign: 'center',color:'black'}}>{data.item.item_name}</Text>
                <Text style={{textAlign: 'center',color:'#193ed1',fontWeight:'bold'}}>{data.item.price} {data.item.currency}</Text>
                
            </TouchableOpacity>
            </View>

              

            )}
                

            
            />:<ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>}

                            
                            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('select_user',{id:this.state.selected_items})} style={styles.submit_btn} >
                        
                            
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
})