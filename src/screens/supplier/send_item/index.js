import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SendItemProduct from '../../../components/sendItemProduct'
export default class SendItem extends React.Component {
    render(){
        return (
            <ScrollView >
            <View style={styles.container}>
               <SendItemProduct navigation={this.props.navigation}/>
               <SendItemProduct navigation={this.props.navigation}/>
               <SendItemProduct navigation={this.props.navigation}/>
               <SendItemProduct navigation={this.props.navigation}/>

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