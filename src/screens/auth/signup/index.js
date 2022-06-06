import React from 'react'
import Buyer from './buyer'
import Supplier from './supplier'

export default class Signup extends React.Component {
    render(){
        if(this.props.route.params.category == 'supplier') {
            return <Supplier navigation={this.props.navigation}/>
        }else{
            return <Buyer navigation={this.props.navigation}/>
        }
    }
}