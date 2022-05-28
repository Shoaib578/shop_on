import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ScrollView,ActivityIndicator,Alert,} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'
export default class Colors extends React.Component{
    state = {
        colors:[],
        color:'',
        is_loading:false
    }
    delete_color = (id)=>{
        Axios.get(base_url+'/apis/colors/delete?color_id='+id)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.get_colors()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }   

    add_color = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.color.length<1){
            Alert.alert("Color Field is required")
            return false
        }
        this.setState({is_loading:true})
        let data = {
            "color":this.state.color,
            "user_id":parse._id
        }
        Axios.post(base_url+'/apis/colors/add',data)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.get_colors()
            this.setState({is_loading:false})
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({is_loading:false})

        })
    }

    get_colors = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/colors/get_colors?user_id='+parse._id)
        .then(res=>{
            this.setState({colors:res.data.colors})
        })

    }

    componentDidMount(){
        this.get_colors()

    }
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.text_input}>
            <Ionicons name="color-fill" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
            <TextInput placeholder="Color"  selectionColor="white" onChangeText={(val)=>this.setState({color:val})} value={this.state.color} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
            />
            </View>

            <TouchableOpacity onPress={this.add_color} disabled={this.state.is_loading} style={styles.submit_btn} >
            {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}
                
                <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Create</Text>
            </TouchableOpacity>


            <ScrollView style={{flex:1}}>
                    {this.state.colors.map((data,index)=>(
                    <View  key={index} style={styles.item_container}>
                    <View style={{flexDirection: 'row',}}>
                    <Ionicons name="color-fill" color="red" size={20}/>

                    <Text style={{color:'#BB952D',left:8}}>{data.color}</Text>
                    </View>
                    

                    <TouchableOpacity onPress={()=>this.delete_color(data._id)}>
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