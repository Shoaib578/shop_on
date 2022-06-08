import React from 'react'
import {View,Text,StyleSheet,ActivityIndicator, Alert,Dimensions,TextInput,Button} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Product from '../../components/product'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Axios  from 'axios'
import base_url from '../../base_url'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from "react-native-modal";

export default class Home extends React.Component {
    state = {
        role:'',
        data:[],
        is_loading:true,
        visible_modal:false,
        currency:'',
        currency_btn_loading:false,

        role:''
    }

    getUserRole = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        
        return parse.role
    }


    UserRoleState = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        this.setState({role:parse.role})

    }

    addCurrency = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        
        if(this.state.currency.length<1){
            Alert.alert("Currency Field is required")
            return false
        }
        this.setState({currency_btn_loading:true})

      
        Axios.post(base_url+'/apis/user/add_currency',{
            "currency":this.state.currency,
            "user_id":parse._id
        })
        .then(res=>{
            console.log(res)
            this.setState({currency_btn_loading:false,visible_modal:false})
        })
        .catch(err=>{
            this.setState({currency_btn_loading:false})

            Alert.alert("Something Went Wrong")
        })

    }

    getCurrency = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/user/get_currency?user_id='+parse._id)
        .then(res=>{
          if(res.data.currency.length>0){
              this.setState({visible_modal:false})
          }else{
            this.setState({visible_modal:true})

          }
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

    getNewItems = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse  = JSON.parse(user)
        Axios.get(base_url+'/apis/item/get_new_items?user_phone_number='+parse.phone_no)
        .then(res=>{
            let new_items = []
            console.log(res.data.items)
            res.data.items.forEach(items=>{
                new_items.push(items)
            })
            this.setState({data:new_items},()=>{
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
        this.UserRoleState()
        if(role == "supplier"){
            this.getCurrency()
            this.getSupplierItems()
        }else{
            this.getNewItems()
        }
        this.props.navigation.addListener("focus",()=>{
        this.UserRoleState()

            if(role == "supplier"){
            this.getCurrency()

                this.getSupplierItems()
            }else{
                this.getNewItems()
            }
    
    
          })

    }

 
    render(){
        if(this.state.is_loading == false){
            return(
            
              
                     <View style={styles.container}>
                        {this.state.role == "buyer"?<FlatList data={this.state.data} 
                        numColumns={1}
                        keyExtractor={(item) => item._id}

                        refreshing={this.state.is_loading}
                         onRefresh={()=>this.Refresh()}
                        
                        
                        renderItem={(data)=>(
                            <Product data={data} type="buyer"  getNewItems={this.getNewItems} navigation={this.props.navigation}/>

                        )}
                        
                        />:
                        
                        <FlatList data={this.state.data} 
                        numColumns={2}
                        keyExtractor={(item) => item._id}

                        refreshing={this.state.is_loading}
                         onRefresh={()=>this.Refresh()}
                        
                        
                        renderItem={(data)=>(
                            <Product data={data} type="supplier" navigation={this.props.navigation}/>

                        )}
                        
                        />
                        }

                <Modal isVisible={this.state.visible_modal}>
              <View style={{ flex: 1,marginTop:'50%' }}>
                <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>Set Your Currency</Text>
            <Text style={{color:'white'}}>Otherwise you wont be able to add product</Text>

              <View style={styles.text_input}>
            <MaterialCommunityIcons name="currency-gbp" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
            <TextInput placeholder="Set currency"  selectionColor="white" value={this.state.currency} onChangeText={(val)=>this.setState({currency:val})} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1'}} 
            />
            </View>
            <Text style={{marginTop:20}}> </Text>
               <Button title='Continue' disabled={this.state.currency_btn_loading} onPress={this.addCurrency}/>
                </View>
              </Modal>
                   
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
    },
    text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"#193ed1",
        color:"#193ed1",
        
        borderRadius:10,
        height:50,
        width:'100%',
        marginTop:20,
      },
      phoneImageStyle:{
        padding: 0,
        marginLeft:9,  
       
       
        alignItems: 'center',
        margin:12,
        
      },
})