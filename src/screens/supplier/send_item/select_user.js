import React from 'react'
import {View,Text,StyleSheet ,TextInput,Dimensions,Image,ScrollView, Alert,ActivityIndicator ,Platform,PermissionsAndroid} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'

let users = []

export default class SelectUser extends React.Component {
    state = {
        select:'users',
        search:'',
        is_loading:false,
        buyers:[],
        users:[],
        page_loading:true,
        contacts:[],
        searched_buyers:[]
    }

    getGroups = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+"/apis/groups/get_groups?user_id="+parse._id)
        .then(res=>{
            console.log(res.data.groups)
            
            this.setState({buyers:res.data.groups})
            this.setState({searched_buyers:this.state.buyers},()=>{
                this.setState({page_loading:false})
            })
        })
    }




    toggleChangeUser = ()=>{
        
        this.setState({select:'users',users:[],page_loading:true})
        this.getContacts()
    }

    toggleChangeGroup = ()=>{
        this.setState({select:'group',users:[],page_loading:true})
        this.getGroups()
    }


    addUserId = (phone_number)=>{
        
        console.log(phone_number)
        let included_user = users.includes(phone_number)
        console.log(included_user)

        if(included_user){
            users.filter(i=>{
                if(i==phone_number){
                  users.splice(users.indexOf(i),1)
                 this.setState({users:users})
                  
                }
            })
        }else{
            users.push(phone_number)
            this.setState({users:users})

        }


    }

    sendItem = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({is_loading:true})
        this.props.route.params.id.forEach((data,index)=>{
            Axios.post(base_url+'/apis/item/send_item',{
                "users":this.state.users,
                "my_id":parse._id,
                "user_type":this.state.select,
                "item_id":data
            })
            .then(res=>{
                
                    Alert.alert("Sent Successfully")
                
                    this.setState({is_loading:false,users:[]})
               
               
    
            })
            .catch(err=>{
                
                Alert.alert("Something Went Wrong")
                this.setState({is_loading:false})
              
            })
        })
        

        


    }


    getContacts = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/contacts/get_contacts?user_id='+parse._id)
        .then(res=>{
            this.setState({buyers:res.data.contacts})
            this.setState({searched_buyers:this.state.buyers},()=>{
                this.setState({page_loading:false})})
        })
        
     
        
   
    }

    search_buyer = (val)=>{
        if(this.state.select == "users"){
            this.setState({searched_buyers:this.state.buyers.filter(i=>i.displayName.toLowerCase().includes(val.toLowerCase()))})

        }else{
            this.setState({searched_buyers:this.state.buyers.filter(i=>i.group_name.toLowerCase().includes(val.toLowerCase()))})

        }
    }
    async componentDidMount(){
     await   this.getContacts()

     this.props.navigation.addListener("focus",async()=>{
        if(this.state.select == "users"){
         await this.getContacts()
        }else{
           await this.getContacts()
        }

     })
       
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row',justifyContent: 'space-between',padding:20}}>
                
                <TouchableOpacity style={{borderColor:'blue',borderWidth:1,borderRadius:5,justifyContent: 'center',backgroundColor:this.state.select=='users'?'blue':'white',marginLeft:20,padding:10}} onPress={this.toggleChangeUser}>
                <Text style={{color:this.state.select=='users'?'white':'black'}}>Users</Text>
                </TouchableOpacity>

               
                <TouchableOpacity  style={{borderColor:'blue',borderWidth:1,borderRadius:5,justifyContent: 'center',backgroundColor:this.state.select=='group'?'blue':'white',marginRight:20,padding:10}} onPress={this.toggleChangeGroup}>
                <Text style={{color:this.state.select=='group'?'white':'black'}}>Group</Text>
                </TouchableOpacity>



                </View>
               

                <View style={styles.text_input}>
                <Feather name="search" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="search"  selectionColor="white" onChangeText={(value)=>{
                  if(value.length>0){
                   

                     this.search_buyer(value)

                  }else{
                      if(this.state.select == "users"){
                          this.getContacts()
                      }else{
                          this.getGroups()
                      }
                     
                  }

                }}  placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>


                {this.state.select == "users"?<ScrollView style={{flex:1,marginTop:10}}>
                    {this.state.searched_buyers.map((data,index)=>{
                        return    <TouchableOpacity key={index} onPress={()=>this.addUserId(data.user_phone_no)} style={[styles.item_container,{borderColor:this.state.users.includes(this.state.page_loading == false ?data.user_phone_no:null)?'red':'#193ed1',borderWidth:1}]}>
                        <FontAwesome name= "user-circle-o" color="red" size={20}/>
    
                     {this.state.page_loading == false?<Text style={{color:'#BB952D',marginLeft:10}}>{data.user_name}</Text>:<ActivityIndicator size="small" color="black"/>}
                    
                    </TouchableOpacity>
                    })}
                


              


                </ScrollView>:

                <ScrollView style={{flex:1,marginTop:10}}>
                     {this.state.searched_buyers.map((data,index)=>{
                        return <TouchableOpacity key={index} onPress={()=>this.addUserId(data._id)} style={[styles.item_container,{borderColor:this.state.users.includes(data._id)?'red':'#193ed1'}]}>
                        <FontAwesome name= "users" color="red" size={20}/>
        
                    {this.state.page_loading == false? <Text style={{color:'#BB952D',marginLeft:10}}>{data.group_name}</Text>:<ActivityIndicator size="small" color="black"/>}
                    
                    </TouchableOpacity>
               

                })}
          


            </ScrollView>
                
                }

                <TouchableOpacity disabled={this.state.is_loading} onPress={this.sendItem} style={styles.submit_btn} >
                {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Send</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       
    },
    text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"black",
        color:"#BB952D",
        alignSelf: 'center',
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
        alignSelf: 'center',

        
       
      },
      submit_btn:{
          flexDirection:'row',
        alignSelf:'center',
        borderWidth:1,
        borderColor:"#193ed1",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#193ed1',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginBottom:30
        
      }
    })