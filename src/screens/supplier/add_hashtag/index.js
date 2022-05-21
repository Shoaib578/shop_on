import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ScrollView,ActivityIndicator,Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'

export default class AddhasTag extends React.Component {
    state = {
        hash_tag:'',
        hash_tags:[],
        is_loading:false
    }

    add_hashtag = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({is_loading:true})
        const data = {
            "user_id":parse._id,
            "hashtag":this.state.hash_tag
        }
        Axios.post(base_url+"/apis/hash_tag/add",data)
        .then(res=>{
            Alert.alert(res.data.msg)

             this.setState({is_loading:false})
            this.getHashTags()

            
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({is_loading:false})
        })
    }

    getHashTags = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
       

        Axios.get(base_url+"/apis/hash_tag/get_hashtags?user_id="+parse._id)
        .then(res=>{
            this.setState({hash_tags:res.data.hash_tags})
        })

    }

    delete_hash_tag = (id)=>{
        Axios.get(base_url+"/apis/hash_tag/delete?id="+id)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.getHashTags()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    componentDidMount(){
        this.getHashTags()
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.text_input}>
                <Feather name="hash" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="Write HashTag"  selectionColor="white" onChangeText={(val)=>this.setState({hash_tag:val})} value={this.state.hash_tag} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>

                <TouchableOpacity onPress={this.add_hashtag} disabled={this.state.is_loading} style={styles.submit_btn} >
                {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Create</Text>
                </TouchableOpacity>


                <ScrollView style={{flex:1}}>
                    {this.state.hash_tags.map(data=>(
                    <View key={data} style={styles.item_container}>
                    <Text style={{color:'#BB952D'}}>{data.hash_tag}</Text>
                        <TouchableOpacity onPress={()=>this.delete_hash_tag(data._id)}>
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