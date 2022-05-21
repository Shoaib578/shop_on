import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image,ScrollView,ActivityIndicator,Alert,Button} from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
const data2 = [
    { label: '', value: ''}
  
  ];

export default class ViewGroup extends React.Component {
    state = {
        users:[],
        is_visible:false,
        all_users:[],
        users_data:[],
        selected_user:'',
      
    }
    getGroupUsers = ()=>{
        Axios.get(base_url+'/apis/groups/view_group?group_id='+this.props.route.params.group_id)
        .then(res=>{
           
            this.setState({users:res.data.users})
        })
    }

    getAllbuyers = ()=>{
        Axios.get(base_url+'/apis/groups/get_all_users')
        .then(res=>{
            
          

            res.data.users.forEach(data=>{
                data2.push( { label: data.buyer.name, value: data._id})
                
            })
            console.log(data2)
            data2.shift()
            this.setState({users_data:data2})
        })


    }

    addUser = ()=>{
        let data={
            "group_id":this.props.route.params.group_id,
            "user_id":this.state.selected_user.value
        }

        Axios.post(base_url+'/apis/groups/add_user',data)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.setState({selected_user:''})
            this.getGroupUsers()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({selected_user:''})

        })
    }

    DeleteUserFromGroup = (id)=>{
        Axios.get(base_url+'/apis/groups/delete_user_from_group?id='+id)
        .then(res=>{
            Alert.alert(res.data.msg)
            this.getGroupUsers()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    toggleModal = ()=>{
        if(this.state.is_visible){
            this.setState({is_visible:false})
        }else{
            this.setState({is_visible:true})

        }
    }
    componentDidMount(){
        this.getGroupUsers()
        this.getAllbuyers()
        
       
    }

    render(){
        return(
          
            <View style={styles.container}>
                <TouchableOpacity onPress={this.toggleModal} style={{marginLeft:'80%',marginTop:20}}>
                    <FontAwesome name="plus" color="#193ed1" size={25}/>
                </TouchableOpacity>
                    {this.state.users.length>0?<ScrollView style={{flex:1,marginTop:20}}>
                        {this.state.users.map(data=>(
                        <View key={data} style={styles.item_container}>
                        <View style={{flexDirection: 'row',}}>
                        <FontAwesome name= "user-circle-o" color="red" size={20}/>

                        <Text style={{color:'#BB952D',left:8}}>{data.users[0].buyer.name}</Text>
                        </View>
                        

                        <TouchableOpacity onPress={()=>this.DeleteUserFromGroup(data._id)}>
                        <FontAwesome name= "trash" color="red" size={20}/>

                        </TouchableOpacity>

                    </View>
                        ))}
               


                


                </ScrollView>:
                
                <View style={{marginTop:20}}>
                    <Text>This Group Doesnt Have Any User Yet</Text>
                    <Text style={{textAlign:'center'}}>Click on Add Button to add user</Text>

                </View>
                }


<Modal  isVisible={this.state.is_visible}>
        <View style={{ flex: 1 }}>
        <Dropdown
          style={[styles.dropdown,{ borderColor: '#193ed1',backgroundColor:'#193ed1' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={this.state.users_data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Buyer'}
          searchPlaceholder="Search..."
         value={this.state.selected_user}
         onChange={item => {
            this.setState({selected_user: item})
            
          }}
       
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
           
              name="user"
              size={20}
            />
          )}
        />
                <View style={{marginTop:10}}> 
                <Text></Text>
                </View>
     
                <Button title="Add" style={{marginTop:20}}  onPress={this.addUser} />
                <View style={{marginTop:10}}> 
                <Text></Text>
                </View>
          <Button title="Close" style={{marginTop:20}}  onPress={this.toggleModal} />
        </View>
</Modal>


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
        borderColor:"white",
        color:"#BB952D",
        
        borderRadius:5,
        height:50,
        width:'99%',
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
        
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
        color:'white'
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
        color:'white'
      },
      selectedTextStyle: {
        fontSize: 16,
      
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    })