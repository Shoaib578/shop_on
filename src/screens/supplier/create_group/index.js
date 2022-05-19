import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ScrollView,ActivityIndicator,Alert,} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'

export default class CreateGroup extends React.Component {
    state = {
        group_name:'',
        groups:[],
        is_loading: false
    }

    add_group_name = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({is_loading:true})

        const data = {
            "group_name":this.state.group_name,
            "added_by":parse._id
        }
        Axios.post(base_url+"/apis/groups/add",data)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.setState({is_loading:false})

        })
        .catch(err=>{
            Alert.alert('Something Went wrong')
            this.setState({is_loading:false})
        })
    }

    getGroups = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+"/apis/groups/get_groups?user_id="+parse._id)
        .then(res=>{
            this.setState({groups:res.data.groups})
        })
    }

    delete_group = (id)=>{
        Axios.get(base_url+"/apis/groups/delete?id="+id)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.getGroups()

        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    componentDidMount(){
        this.getGroups()
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.text_input}>
                <FontAwesome name="users" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="Group Name"  selectionColor="white" onChangeText={(val)=>this.setState({group_name:val})} value={this.state.group_name} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>

                <TouchableOpacity onPress={this.add_group_name} disabled={this.state.is_loading} style={styles.submit_btn} >
                {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Create</Text>
                </TouchableOpacity>


                <ScrollView style={{flex:1}}>
                        {this.state.groups.map(data=>(
                        <View key={data} style={styles.item_container}>
                        <View style={{flexDirection: 'row',}}>
                        <FontAwesome name= "user-circle-o" color="red" size={20}/>

                        <Text style={{color:'#BB952D',left:8}}>{data.group_name}</Text>
                        </View>
                        

                        <TouchableOpacity onPress={()=>this.delete_group(data._id)}>
                        <FontAwesome name= "trash" color="red" size={20}/>

                        </TouchableOpacity>

                    </View>
                        ))}
               


                


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
        justifyContent: 'space-between',
      },
      submit_btn:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"#193ed1",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#193ed1',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:30,
        
      }
    })