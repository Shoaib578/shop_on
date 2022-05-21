import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'



import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React,{useState,useEffect} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
  let role = ""
  const logout = async(props)=>{
    await AsyncStorage.removeItem("user")
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'AuthNavigator', screen: 'signin' }]
  });

  }

 const getUserRole = async()=>{
    const user = await AsyncStorage.getItem("user")
    const parse = JSON.parse(user)
    role = parse.role
  }
  const CustomSidebar = (props) => {
    getUserRole()
    const { state, descriptors, navigation } = props;
    let lastGroupName = '';
    let newGroup = true;
    
    

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('profile')}>
         <Image source={require('../assets/images/old-woman.png')} style={{width:100,height:100,alignSelf: 'center',marginTop:20}}/>
         </TouchableOpacity>
        <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
          {state.routes.map((route) => {
            const {
              drawerLabel,
              activeTintColor,
              groupName
            } = descriptors[route.key].options;
            if (lastGroupName !== groupName) {
              newGroup = true;
              lastGroupName = groupName;
            } else newGroup = false;
           
            if(groupName != null){

            return (
            
              <>
                {newGroup ? (
                  <View style={styles.sectionView}>
                    <TouchableOpacity style={{flexDirection: 'row',justifyContent: 'space-between'}} onPress={()=>{
                        if(sectionname == groupName){
                        setSectionName(null)

                        }else{
                          setSectionName(groupName)

                        }

                      
                      
                      }}>

                    <Text key={groupName} style={{ marginLeft: 10,fontSize:15,color:'black' }}>
                      {groupName}
                    </Text>

                    {sectionname == groupName?<AntDesign name="down" color="black" size={20} style={{left:200,position:'absolute'}}/>:<AntDesign name="right" color="black" size={20} style={{left:200,position:'absolute'}}/>}
                    </TouchableOpacity>

                  
                  </View>
                ) : null}
                {sectionname == groupName && sectionname != null?<DrawerItem
                  key={route.key}
                  label={
                    ({ color }) =>
                      <Text style={{ color }}>
                        {drawerLabel}
                      </Text>
                  }
                  focused={
                    state.routes.findIndex(
                      (e) => e.name === route.name
                    ) === state.index
                  }
                  activeTintColor={activeTintColor}
                  onPress={() => navigation.navigate(route.name)}
                />:null}
                
              </>
            );
          }else{
            if(role == "buyer"){
              if( drawerLabel == "Home"){
                return <DrawerItem
                key={route.key}
                style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
                borderColor:'#F0F0F0',
                width:'92.3%',
                borderWidth:1,
                borderRadius:5,}}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                } 
                icon={({color,size})=>{
                  if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
               
                    return   <Feather name="package" color="black" size={20}/>
                  
                  }else if(drawerLabel == "Home"){
                    return   <Entypo name="home" color="black" size={20}/>
    
                  }else if(drawerLabel == "Hash Tags"){
                    return   <Feather name="hash" color="black" size={20}/>
    
                  }else if(drawerLabel == "Create Group"){
                    return  <FontAwesome name="group" color="black" size={20}/>
                  }else if(drawerLabel == "Send Item"){
                    return  <FontAwesome name="send" color="black" size={20}/>
    
                  }else if(drawerLabel == 'Add item'){
                    return <AntDesign name="pluscircleo" color="black" size={20}/>
                  }
                  } 
                }
                
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                
                onPress={() => navigation.navigate(route.name)}
              />
              }else if(drawerLabel == "Orders"){
                return <DrawerItem
              key={route.key}
              style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
              borderColor:'#F0F0F0',
              width:'92.3%',
              borderWidth:1,
              borderRadius:5,}}
              label={
                ({ color }) =>
                  <Text style={{ color }}>
                    {drawerLabel}
                  </Text>
              } 
              icon={({color,size})=>{
                if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
             
                  return   <Feather name="package" color="black" size={20}/>
                
                }else if(drawerLabel == "Home"){
                  return   <Entypo name="home" color="black" size={20}/>
  
                }else if(drawerLabel == "Hash Tags"){
                  return   <Feather name="hash" color="black" size={20}/>
  
                }else if(drawerLabel == "Create Group"){
                  return  <FontAwesome name="group" color="black" size={20}/>
                }else if(drawerLabel == "Send Item"){
                  return  <FontAwesome name="send" color="black" size={20}/>
  
                }else if(drawerLabel == 'Add item'){
                  return <AntDesign name="pluscircleo" color="black" size={20}/>
                }
                } 
              }
              
              focused={
                state.routes.findIndex(
                  (e) => e.name === route.name
                ) === state.index
              }
              activeTintColor={activeTintColor}
              
              onPress={() => navigation.navigate(route.name)}
            />
              }else if(drawerLabel == "Orders History"){
                return <DrawerItem
              key={route.key}
              style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
              borderColor:'#F0F0F0',
              width:'92.3%',
              borderWidth:1,
              borderRadius:5,}}
              label={
                ({ color }) =>
                  <Text style={{ color }}>
                    {drawerLabel}
                  </Text>
              } 
              icon={({color,size})=>{
                if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
             
                  return   <Feather name="package" color="black" size={20}/>
                
                }else if(drawerLabel == "Home"){
                  return   <Entypo name="home" color="black" size={20}/>
  
                }else if(drawerLabel == "Hash Tags"){
                  return   <Feather name="hash" color="black" size={20}/>
  
                }else if(drawerLabel == "Create Group"){
                  return  <FontAwesome name="group" color="black" size={20}/>
                }else if(drawerLabel == "Send Item"){
                  return  <FontAwesome name="send" color="black" size={20}/>
  
                }else if(drawerLabel == 'Add item'){
                  return <AntDesign name="pluscircleo" color="black" size={20}/>
                }
                } 
              }
              
              focused={
                state.routes.findIndex(
                  (e) => e.name === route.name
                ) === state.index
              }
              activeTintColor={activeTintColor}
              
              onPress={() => navigation.navigate(route.name)}
            />
            }
            }else if(role == "supplier"){
              if( drawerLabel == "Home"){
                return <DrawerItem
                key={route.key}
                style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
                borderColor:'#F0F0F0',
                width:'92.3%',
                borderWidth:1,
                borderRadius:5,}}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                } 
                icon={({color,size})=>{
                  if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
               
                    return   <Feather name="package" color="black" size={20}/>
                  
                  }else if(drawerLabel == "Home"){
                    return   <Entypo name="home" color="black" size={20}/>
    
                  }else if(drawerLabel == "Hash Tags"){
                    return   <Feather name="hash" color="black" size={20}/>
    
                  }else if(drawerLabel == "Create Group"){
                    return  <FontAwesome name="group" color="black" size={20}/>
                  }else if(drawerLabel == "Send Item"){
                    return  <FontAwesome name="send" color="black" size={20}/>
    
                  }else if(drawerLabel == 'Add item'){
                    return <AntDesign name="pluscircleo" color="black" size={20}/>
                  }
                  } 
                }
                
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                
                onPress={() => navigation.navigate(route.name)}
              />
              }else if( drawerLabel == "Orders History"){
                return <DrawerItem
              key={route.key}
              style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
              borderColor:'#F0F0F0',
              width:'92.3%',
              borderWidth:1,
              borderRadius:5,}}
              label={
                ({ color }) =>
                  <Text style={{ color }}>
                    {drawerLabel}
                  </Text>
              } 
              icon={({color,size})=>{
                if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
             
                  return   <Feather name="package" color="black" size={20}/>
                
                }else if(drawerLabel == "Home"){
                  return   <Entypo name="home" color="black" size={20}/>
  
                }else if(drawerLabel == "Hash Tags"){
                  return   <Feather name="hash" color="black" size={20}/>
  
                }else if(drawerLabel == "Create Group"){
                  return  <FontAwesome name="group" color="black" size={20}/>
                }else if(drawerLabel == "Send Item"){
                  return  <FontAwesome name="send" color="black" size={20}/>
  
                }else if(drawerLabel == 'Add item'){
                  return <AntDesign name="pluscircleo" color="black" size={20}/>
                }
                } 
              }
              
              focused={
                state.routes.findIndex(
                  (e) => e.name === route.name
                ) === state.index
              }
              activeTintColor={activeTintColor}
              
              onPress={() => navigation.navigate(route.name)}
            />
              }
              else if( drawerLabel == "Hash Tags"){
                return <DrawerItem
              key={route.key}
              style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
              borderColor:'#F0F0F0',
              width:'92.3%',
              borderWidth:1,
              borderRadius:5,}}
              label={
                ({ color }) =>
                  <Text style={{ color }}>
                    {drawerLabel}
                  </Text>
              } 
              icon={({color,size})=>{
                if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
             
                  return   <Feather name="package" color="black" size={20}/>
                
                }else if(drawerLabel == "Home"){
                  return   <Entypo name="home" color="black" size={20}/>
  
                }else if(drawerLabel == "Hash Tags"){
                  return   <Feather name="hash" color="black" size={20}/>
  
                }else if(drawerLabel == "Create Group"){
                  return  <FontAwesome name="group" color="black" size={20}/>
                }else if(drawerLabel == "Send Item"){
                  return  <FontAwesome name="send" color="black" size={20}/>
  
                }else if(drawerLabel == 'Add item'){
                  return <AntDesign name="pluscircleo" color="black" size={20}/>
                }
                } 
              }
              
              focused={
                state.routes.findIndex(
                  (e) => e.name === route.name
                ) === state.index
              }
              activeTintColor={activeTintColor}
              
              onPress={() => navigation.navigate(route.name)}
            />
              }else if(drawerLabel == "Received Orders"){
                return <DrawerItem
                key={route.key}
                style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
                borderColor:'#F0F0F0',
                width:'92.3%',
                borderWidth:1,
                borderRadius:5,}}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                } 
                icon={({color,size})=>{
                  if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
               
                    return   <Feather name="package" color="black" size={20}/>
                  
                  }else if(drawerLabel == "Home"){
                    return   <Entypo name="home" color="black" size={20}/>
    
                  }else if(drawerLabel == "Hash Tags"){
                    return   <Feather name="hash" color="black" size={20}/>
    
                  }else if(drawerLabel == "Create Group"){
                    return  <FontAwesome name="group" color="black" size={20}/>
                  }else if(drawerLabel == "Send Item"){
                    return  <FontAwesome name="send" color="black" size={20}/>
    
                  }else if(drawerLabel == 'Add item'){
                    return <AntDesign name="pluscircleo" color="black" size={20}/>
                  }
                  } 
                }
                
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                
                onPress={() => navigation.navigate(route.name)}
              />
              }else if(drawerLabel == "Create Group"){
                return <DrawerItem
                key={route.key}
                style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
                borderColor:'#F0F0F0',
                width:'92.3%',
                borderWidth:1,
                borderRadius:5,}}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                } 
                icon={({color,size})=>{
                  if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
               
                    return   <Feather name="package" color="black" size={20}/>
                  
                  }else if(drawerLabel == "Home"){
                    return   <Entypo name="home" color="black" size={20}/>
    
                  }else if(drawerLabel == "Hash Tags"){
                    return   <Feather name="hash" color="black" size={20}/>
    
                  }else if(drawerLabel == "Create Group"){
                    return  <FontAwesome name="group" color="black" size={20}/>
                  }else if(drawerLabel == "Send Item"){
                    return  <FontAwesome name="send" color="black" size={20}/>
    
                  }else if(drawerLabel == 'Add item'){
                    return <AntDesign name="pluscircleo" color="black" size={20}/>
                  }
                  } 
                }
                
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                
                onPress={() => navigation.navigate(route.name)}
              />
              }else if( drawerLabel == "Add item"){
                return <DrawerItem
                key={route.key}
                style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
                borderColor:'#F0F0F0',
                width:'92.3%',
                borderWidth:1,
                borderRadius:5,}}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                } 
                icon={({color,size})=>{
                  if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
               
                    return   <Feather name="package" color="black" size={20}/>
                  
                  }else if(drawerLabel == "Home"){
                    return   <Entypo name="home" color="black" size={20}/>
    
                  }else if(drawerLabel == "Hash Tags"){
                    return   <Feather name="hash" color="black" size={20}/>
    
                  }else if(drawerLabel == "Create Group"){
                    return  <FontAwesome name="group" color="black" size={20}/>
                  }else if(drawerLabel == "Send Item"){
                    return  <FontAwesome name="send" color="black" size={20}/>
    
                  }else if(drawerLabel == 'Add item'){
                    return <AntDesign name="pluscircleo" color="black" size={20}/>
                  }
                  } 
                }
                
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                
                onPress={() => navigation.navigate(route.name)}
              />
              }else if( drawerLabel == "Send Item"){
                return <DrawerItem
                key={route.key}
                style={{marginTop:drawerLabel=="Home"?20:10,backgroundColor:'#F0F0F0',
                borderColor:'#F0F0F0',
                width:'92.3%',
                borderWidth:1,
                borderRadius:5,}}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                } 
                icon={({color,size})=>{
                  if(drawerLabel == "Orders" || drawerLabel == "Received Orders" || drawerLabel == "Orders History"){
               
                    return   <Feather name="package" color="black" size={20}/>
                  
                  }else if(drawerLabel == "Home"){
                    return   <Entypo name="home" color="black" size={20}/>
    
                  }else if(drawerLabel == "Hash Tags"){
                    return   <Feather name="hash" color="black" size={20}/>
    
                  }else if(drawerLabel == "Create Group"){
                    return  <FontAwesome name="group" color="black" size={20}/>
                  }else if(drawerLabel == "Send Item"){
                    return  <FontAwesome name="send" color="black" size={20}/>
    
                  }else if(drawerLabel == 'Add item'){
                    return <AntDesign name="pluscircleo" color="black" size={20}/>
                  }
                  } 
                }
                
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                
                onPress={() => navigation.navigate(route.name)}
              />
              }
            }
            
            
          }

          })}

         <TouchableOpacity onPress={()=>logout(props)} style={{flexDirection: 'row',
      alignItems: 'center',
      marginTop:10,
      height:50,
      marginLeft:10,
      backgroundColor:'#F0F0F0',
      borderColor:'#F0F0F0',
      width:'92.3%',
      borderWidth:1,
      borderRadius:5}}>
        <FontAwesome name="sign-out" color="black" size={20} style={{marginLeft:10}}/>
        
        <Text style={{marginLeft:30}}>Sign out</Text>
         </TouchableOpacity>
        </DrawerContentScrollView>
      </SafeAreaView>
    );
    
  };
  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
   
    sectionView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop:10,
      height:50,
      marginLeft:10,
      backgroundColor:'#F0F0F0',
      borderColor:'#F0F0F0',
      width:'92.3%',
      borderWidth:1,
      borderRadius:5
    },
   
   
  });
  export default CustomSidebar