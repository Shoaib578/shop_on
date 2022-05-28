import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ScrollView,ActivityIndicator,Alert,} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'
export default class Size extends React.Component{
    state = {
        sizes:[],
        size:'',
        is_loading:false
    }
   
    delete_size = (id)=>{
        Axios.get(base_url+'/apis/sizes/delete?size_id='+id)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.get_sizes()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }   

    add_size = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.size.length<1){
            Alert.alert("Size Field is required")
            return false
        }
        this.setState({is_loading:true})
        let data = {
            "size":this.state.size,
            "user_id":parse._id
        }
        Axios.post(base_url+'/apis/sizes/add',data)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.get_sizes()
            this.setState({is_loading:false})
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({is_loading:false})

        })
    }

    get_sizes = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/sizes/get_sizes?user_id='+parse._id)
        .then(res=>{
            this.setState({sizes:res.data.sizes})
        })

    }

    componentDidMount(){
        this.get_sizes()

    }


    render(){
        return(
            <View style={styles.container}>
            <View style={styles.text_input}>
            <Entypo name="resize-100" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
            <TextInput placeholder="Size"  selectionColor="white" onChangeText={(val)=>this.setState({size:val})} value={this.state.size} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
            />
            </View>

            <TouchableOpacity onPress={this.add_size} disabled={this.state.is_loading} style={styles.submit_btn} >
            {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}
                
                <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>Create</Text>
            </TouchableOpacity>


            <ScrollView style={{flex:1}}>
                    {this.state.sizes.map((data,index)=>(
                    <View  key={index} style={styles.item_container}>
                    <View style={{flexDirection: 'row',}}>
                    <Entypo name="resize-100" color="red" size={20}/>

                    <Text style={{color:'#BB952D',left:8}}>{data.size}</Text>
                    </View>
                    

                    <TouchableOpacity onPress={()=>this.delete_size(data._id)}>
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