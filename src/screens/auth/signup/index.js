import React from 'react'
import Buyer from './buyer'
import Supplier from './supplier'

export default class Signup extends React.Component {
    render(){
        if(this.props.route.params.category == 'suppier') {
            return <Supplier />
        }else{
            return <Buyer />
        }
    }
}