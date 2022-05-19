import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Product from '../../components/product'
export default class Home extends React.Component {
    render(){
        return(
            
                <ScrollView >
                     <View style={styles.container}>
                     <Product navigation={this.props.navigation}/>
                    <Product navigation={this.props.navigation}/>
                    <Product navigation={this.props.navigation}/>
                    <Product navigation={this.props.navigation}/>
                    <Product navigation={this.props.navigation}/>
                    <Product navigation={this.props.navigation}/>
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