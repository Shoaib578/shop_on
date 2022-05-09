import React from 'react'
import {View,Text,StyleSheet,TextInput,Dimensions,Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
export default class Search extends React.Component {
    state = {
        search:''
    }
    render(){
        return(
            <View style={styles.container}>
                 <View style={styles.text_input}>
                <Feather name="search" style={styles.phoneImageStyle} color="#193ed1" size={25}/>
                <TextInput placeholder="search Item"  selectionColor="white" onChangeText={(val)=>this.setState({search:val})} value={this.state.search} placeholderTextColor="#193ed1" style={{flex:1,color:'#193ed1',}} 
                />
                </View>


                <TouchableOpacity style={styles.item_container}>
                <Image source={require('../../assets/images/product1.png')} style={{width:100,borderRadius:10,height:60,}}/>
                <View style={{marginLeft:20}}>
                <Text style={{color:'black'}}>New Abaya</Text>
                <Text style={{color:'#193ed1',fontWeight:'bold'}}>$20</Text>
                </View>
                </TouchableOpacity>



                <TouchableOpacity style={styles.item_container}>
                <Image source={require('../../assets/images/product1.png')} style={{width:100,borderRadius:10,height:60,}}/>
                <View style={{marginLeft:20}}>
                <Text style={{color:'black'}}>New Abaya</Text>
                <Text style={{color:'#193ed1',fontWeight:'bold'}}>$20</Text>
                </View>
                </TouchableOpacity>


               


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
  }
})