import React from 'react';
import {View,Text,TouchableOpacity,Dimensions,Image,StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

class ChooseType extends React.Component {
    render(){
        return(
            <View style={styles.container}>
             
             <Image source={require('../../../assets/images/shopon-logo.png')} style={{width:120,height:120,marginTop:'30%',alignSelf:'center'}}/>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('signup',{category: 'supplier'})} style={[styles.i_am_seller_btn,{marginTop:35}]} >
                    <Feather name="user" color="white" size={25}/>
                    <Text style={{ color:'white',fontSize:16,fontWeight:'bold',left:10 }}>I Am Supplier</Text>
                </TouchableOpacity>


                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('signup',{category: 'buyer'})} style={[styles.i_am_buyer_btn,{marginTop:32}]} >
                    <Feather name="user" color="white" size={25}/>
                    <Text style={{ color:'white',fontSize:16,fontWeight:'bold',left:10 }}>I Am Buyer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
      
        alignItems: 'center',
        backgroundColor: '#193ed1',
        height: '100%',

    },
    i_am_seller_btn:{
        borderWidth:1,
        borderColor:'white',
        padding:10,
        width:Dimensions.get('window').width*2/2.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5 ,
        flexDirection:'row'
    },
    i_am_buyer_btn:{
        borderWidth:1,
        borderColor:'white',
        padding:10,
        width:Dimensions.get('window').width*2/2.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5 ,
        flexDirection:'row'
    },
})
export default ChooseType