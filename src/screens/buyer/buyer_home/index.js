import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Product from '../../../components/product'
export default class BuyerHome extends React.Component {
    render(){
        return(
            
                <ScrollView >
                     <View style={styles.container}>
                     <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                     </View>
                   
                </ScrollView>
          
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