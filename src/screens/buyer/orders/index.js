import React from 'react'
import {View,Text, StyleSheet,ImageBackground,Dimensions,Image} from 'react-native'

export default class Orders extends React.Component {

    render(){
        return <View style={styles.container}>
            <View style={styles.orderCard}>

            <Image source={require('../../../assets/images/product1.png')} style={{width:'100%',height:150,borderRadius:10,}}/>
            <View style={styles.status}><Text style={styles.statusText}>Pending</Text></View>
               

              
                <View style={styles.ProductInfo}>
                <Text style={styles.ProductTitle}>New Bag</Text>
                <Text style={styles.ProductPrice}>Price: 13$</Text>
                <Text style={styles.OrderFrom}>Order From: Shahid Khan</Text>
                </View>
                
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container:{
       flex:1,
        alignitems: 'center'
    },

    orderCard:{
        width:Dimensions.get('window').width*2/2.2,
        marginTop:20,
        borderRadius:10,
       
        borderWidth:1,
        alignSelf:'center',
        borderColor:"#193ed1",
        marginBottom:20,
        paddingBottom:10
    },

  

    productImage:{
        width:'100%',
        height:'100%',
        flex:1,
        alignItems:'flex-end'
    },

    status:{
        left:'75%',
        marginTop:5,
        backgroundColor:'orange',
        padding:3,
        borderRadius:10,
        position:'absolute'
    },

    statusText:{
        fontSize:16,
        fontWeight:'bold',
    },

    ProductInfo:{
        paddingLeft:'5%',
        paddingTop:'5%'
    },

    ProductTitle:{
        fontSize:18,
        fontWeight:'bold',
    },

    ProductPrice:{
        fontSize:18,
        marginTop:'1%',
        fontWeight:'bold',
    },

    OrderFrom:{
        fontSize:18,
        marginTop:'1%',
        fontWeight:'bold',
    }

})