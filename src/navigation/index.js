import React from 'react'
import {View,Text,Image,TouchableOpacity,SafeAreaView,StyleSheet} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/home';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { NavigationContainer,useRoute } from '@react-navigation/native';
import Splash from '../screens/splash';
import Signin from '../screens/auth/signin';
import Signup from '../screens/auth/signup';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomSidebar from './custom_sidebar';
import Entypo from 'react-native-vector-icons/Entypo'
import Search from '../screens/search';
import ChooseType from '../screens/auth/signup/choose_type';
import Cart from '../screens/buyer/cart';
import Orders from '../screens/buyer/orders';
import AddhasTag from '../screens/supplier/add_hashtag';
import Additem from '../screens/supplier/add_item';
import CreateGroup from '../screens/supplier/create_group';
import SendItem from '../screens/supplier/send_item';
import OrdersHistory from '../screens/supplier/order_history';
import ReceivedOrders from '../screens/supplier/received_orders';
import Profile from '../screens/profile';
import ViewProduct from '../screens/view_product';
import SelectUser from '../screens/supplier/send_item/select_user';
import ViewGroup from '../screens/supplier/create_group/view_group';
import SupplierCustomSidebar from './supplier_custom_sidebase';
import ViewSupplier from '../screens/supplier/view_supplier';
import ViewBuyer from '../screens/buyer/view_buyer';
import Colors from '../screens/supplier/colors';
import Size from '../screens/supplier/size';



const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
let role =""



export default function  RootNavigator (){
    return(
        <Stack.Navigator initialRouteName="SplashNavigator">
        
        
        <Stack.Screen name='MainNavigator' component={MainNavigator} options={{headerShown:false}}/>
        <Stack.Screen name='SupplierNavigator' component={SupplierNavigator} options={{headerShown:false}}/>

        
        <Stack.Screen name='SplashNavigator' component={SplashNavigator} options={{headerShown:false}}/>
        <Stack.Screen name='AuthNavigator' component={AuthNavigator} options={{headerShown:false}}/>

        </Stack.Navigator>

    )

}


const headerRight = (navigation)=>{

  const route = useRoute();

    
   
      return( 
      <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
      {route.name != 'search'?<TouchableOpacity onPress={()=>navigation.navigate('search')} style={{right:23}}>
      <AntDesign name="search1" color="black" size={25}/>
      </TouchableOpacity>:null}

     {route.name != 'cart'?<TouchableOpacity onPress={()=>navigation.navigate('cart')}>
          <MaterialCommunityIcons name="purse-outline" color="black" size={25}/>
       </TouchableOpacity>:null}
  </View>
      )
   
}


const supplierheaderRight =  (navigation)=>{
  const route = useRoute();

  return    <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
      {route.name != 'search'?<TouchableOpacity onPress={()=>navigation.navigate('search')} style={{right:23}}>
      <AntDesign name="search1" color="black" size={25}/>
      </TouchableOpacity>:null}

     
  </View>
}

//Buyer Stacks Start

const HomeStack = ({navigation,route})=>(
    <Stack.Navigator  screenOptions={{headerTitle:'Home',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
    <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
     </TouchableWithoutFeedback>,
     headerRight:()=>headerRight(navigation)
     }}>
        <Stack.Screen name='home_screen' component={Home} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center',}}/>

        <Stack.Screen name='search' component={Search} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>

        <Stack.Screen name='cart' component={Cart} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>
        <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>
        <Stack.Screen name='view_item' component={ViewProduct} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>


    </Stack.Navigator>
)

const DashboardStack = ({navigation,route})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'Home',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>
      <Stack.Screen name='dashboard_screen' component={Home} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>

     
      <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>
      <Stack.Screen name='view_item' component={ViewProduct} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>


  </Stack.Navigator>
)

const OrderStack = ({navigation})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'Home',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>
      <Stack.Screen name='orders_screen' component={Orders} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center',headerRight:()=>headerRight(navigation)}}/>

      <Stack.Screen name='search' component={Search} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center',headerRight:()=>headerRight(navigation)}}/>

      <Stack.Screen name='cart' component={Cart} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center',headerRight:()=>headerRight(navigation)}}/>
      <Stack.Screen name='view_supplier' component={ViewSupplier} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center',headerRight:()=>headerRight(navigation)}}/>

      <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center',headerRight:()=>headerRight(navigation)}}/>

  </Stack.Navigator>
)

//End Buyer Stack


//Supplier Stacks Start
const HashTagsStack = ({navigation})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'HashTags',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>
      <Stack.Screen name='hash_tags_screen' component={AddhasTag} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>

      <Stack.Screen name='search' component={Search} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center'}}/>

      <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>


  </Stack.Navigator>
)



const AddItemStack = ({navigation})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'Add item',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>
      <Stack.Screen name='add_item_screen' component={Additem} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='search' component={Search} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>
      <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>



  </Stack.Navigator>
)



const CreateGroupStack = ({navigation})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'Create Group',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>
      <Stack.Screen name='create_group_screen' component={CreateGroup} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='search' component={Search} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='view_group' component={ViewGroup} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

  </Stack.Navigator>
)

const ColorsStack = ({navigation})=>(
<Stack.Navigator  screenOptions={{headerTitle:'Create Group',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>

<Stack.Screen name='colors' component={Colors} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>


   </Stack.Navigator>
)


const SizeStack = ({navigation})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'Create Group',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>

<Stack.Screen name='size' component={Size} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>


   </Stack.Navigator>
)
const SendItemStack = ({navigation})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'Send Item',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>
      <Stack.Screen name='send_item_screen' component={SendItem} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='search' component={Search} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>
      <Stack.Screen name='select_user' component={SelectUser} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>


  </Stack.Navigator>
)



const ordersHistoryStack = ({navigation})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'Orders History',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>
      <Stack.Screen name='orders_history_screen' component={OrdersHistory} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='search' component={Search} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>
      <Stack.Screen name='view_buyer' component={ViewBuyer} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>
      <Stack.Screen name='view_supplier' component={ViewSupplier} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center',headerRight:()=>headerRight(navigation)}}/>

      <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>


  </Stack.Navigator>
)


const ReceivedOrdersyStack = ({navigation})=>(
  <Stack.Navigator  screenOptions={{headerTitle:'Received Orders',headerLeft:()=><TouchableWithoutFeedback onPress={()=>navigation.openDrawer()} style={{width:30,height:30}}>
  <Image style={{width:30,height:30}} source={require('../assets/images/Menu.png')}/>
   </TouchableWithoutFeedback> 
   }}>
      <Stack.Screen name='received_orders_screen' component={ReceivedOrders} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='search' component={Search} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='profile' component={Profile} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

      <Stack.Screen name='view_buyer' component={ViewBuyer} options={{headerTitle:()=><Text style={{fontSize:18,fontFamily:'JosefinSans',color:'black',opacity:0.8}}>Shop-ON</Text>,headerTitleAlign: 'center' }}/>

  </Stack.Navigator>
)

//Supplier Stacks End


const SupplierNavigator = ()=>{
  return(
    <Drawer.Navigator
  
    drawerContent={(props) => <SupplierCustomSidebar {...props} />}>
    <Drawer.Screen
      name="Dashboard"
      options={{
        
        drawerLabel: 'Dashboard',
        
        activeTintColor: '#193ed1',
        
        headerShown:false,
       
      }}
      component={DashboardStack}
    />


  <Drawer.Screen
      name="Hash Tags"
      options={{
        
        drawerLabel: 'Hash Tags',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={HashTagsStack}
    />


    <Drawer.Screen
      name="Received Orders"
      options={{
        
        drawerLabel: 'Received Orders',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={ReceivedOrdersyStack}
    />





<Drawer.Screen
      name="Orders History"
      options={{
        
        drawerLabel: 'Orders History',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={ordersHistoryStack}
    />


<Drawer.Screen
      name="Colors"
      options={{
        
        drawerLabel: 'Colors',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={ColorsStack}
    />

<Drawer.Screen
      name="Sizes"
      options={{
        
        drawerLabel: 'Sizes',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={SizeStack}
    />


  <Drawer.Screen
      name="Create Group"
      options={{
        
        drawerLabel: 'Create Group',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={CreateGroupStack}
    />



  <Drawer.Screen
      name="Add Item"
      options={{
        
        drawerLabel: 'Add item',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={AddItemStack}
    />

    <Drawer.Screen
      name="Send Item"
      options={{
        
        drawerLabel: 'Send Item',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={SendItemStack}
    />




    </Drawer.Navigator>
  )
}

const MainNavigator = ()=>{

    return(
    <Drawer.Navigator
  
    drawerContent={(props) => <CustomSidebar {...props} />}>
    

     


    <Drawer.Screen
      name="Home"
      options={{
        
        drawerLabel: 'Home',
        
        activeTintColor: '#193ed1',
        
        headerShown:false,
       
      }}
      component={HomeStack}
    />

    

    <Drawer.Screen
      name="orders"
      options={{
        
        drawerLabel: 'Orders',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={OrderStack}
    />


<Drawer.Screen
      name="Orders History"
      options={{
        
        drawerLabel: 'Orders History',
        
        activeTintColor: '#193ed1',
       
        headerShown:false,
       
      }}
      component={ordersHistoryStack}
    />


  </Drawer.Navigator>
)
    }


const AuthNavigator = ()=>(
<Stack.Navigator initialRouteName="sigin" >
        <Stack.Screen name='sigin' component={Signin} options={{headerShown:false}}/>
        <Stack.Screen name='signup' component={Signup} options={{headerTransparent:true,headerTitle:' ',headerTintColor:'white'}}/>
        <Stack.Screen name='choose_type' component={ChooseType} options={{headerTitle:'Choose',headerTintColor:'white',headerTransparent:true}}/>

    </Stack.Navigator>
)
const SplashNavigator = ()=>(
    <Stack.Navigator initialRouteName="splash" >
        <Stack.Screen name='splash' component={Splash} options={{headerShown:false}}/>

    </Stack.Navigator>
)

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
      marginTop: 12,
    },
    separatorLine: {
      flex: 1,
      backgroundColor: 'black',
      height: 1.2,
      marginLeft: 12,
      marginRight: 24,
    },
   
  });