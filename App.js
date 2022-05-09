import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import RootNavigator from './src/navigation'

class App extends React.Component {

  render(){
    
    return(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
     )
  }
}

export default App