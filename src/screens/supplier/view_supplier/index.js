import Axios  from 'axios';
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView,ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import base_url from '../../../base_url';

export default class ViewSupplier extends React.Component{
    state = {
        company_name:'',
        phone_no:'',
        address:'',
        is_loading:true
    }

    getUserDetail = ()=>{
        Axios.get(base_url+'/apis/user/profile_screen?user_id='+this.props.route.params.id)
        .then(res=>{
            this.setState({
                company_name:res.data.user.supplier.company_name,
                phone_no:res.data.user.phone_no,
                address:res.data.user.supplier.address
            },()=>{
                this.setState({is_loading:false})
            })
        })
    }


    componentDidMount(){
        this.getUserDetail()
    }
    render(){
        if(this.state.is_loading == false){
            return(
                <View style={styles.container}>
                    <FontAwesome name="user-circle-o" color="blue" size={100} style={{marginTop:30}}/>
                    <Text style={{textAlign:'center',fontWeight:'bold',color:'black'}}>{this.state.company_name}</Text>
                    <Text style={{color:'gray'}}>{this.state.phone_no}</Text>
                    <Text style={{color:'gray'}}>{this.state.address}</Text>
    
                </View>
            )
        }else{
            return <ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>
        }
       
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    }
})