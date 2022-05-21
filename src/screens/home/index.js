import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Product from '../../components/product'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../base_url'

export default class Home extends React.Component {
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
        if(this.state.is_loading == false){
            return(
            
              
                     <View style={styles.container}>
                        <FlatList data={this.state.data} 
                        numColumns={2}
                        keyExtractor={(item) => item._id}

                        refreshing={this.state.is_loading}
                         onRefresh={()=>this.Refresh()}
                        
                        
                        renderItem={(data)=>(
                            <Product data={data} navigation={this.props.navigation}/>

                        )}
                        
                        />
                   
                     </View>
                   
               
          
        )
        }else{
            return <View >
                <ActivityIndicator color="black" size="large" style={{alignSelf: "center",marginTop:30}}/>
            </View>
        }
       
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