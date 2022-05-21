import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { ScrollView,FlatList } from 'react-native-gesture-handler'
import SendItemProduct from '../../../components/sendItemProduct'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../../base_url'
export default class SendItem extends React.Component {
    state = {
        role:'',
        data:[],
        is_loading:true
    }

    getUserRole = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
       
        return parse.role
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

    getNewItems = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse  = JSON.parse(user)
        Axios.get(base_url+'/apis/item/get_new_items?user_id='+parse._id)
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

   async componentDidMount(){
        let role =await this.getUserRole()
        
        if(role == "supplier"){
            this.getSupplierItems()
        }else{
            this.getNewItems()
        }
    }

    render(){
        return (
            <View style={styles.container}>
            <FlatList data={this.state.data} 
            numColumns={2}
            keyExtractor={(item) => item._id}
            
            refreshing={this.state.is_loading}
             onRefresh={()=>this.Refresh()}
            
            
            renderItem={(data)=>(
               <SendItemProduct data={data} navigation={this.props.navigation}/>

              

            )}
            
            />
            </View>
     
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'space-between',
        padding:15 
    }
})