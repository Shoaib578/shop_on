import React from 'react';
import {View,Text,Button, ScrollView, Dimensions,TextInput,TouchableOpacity,Image, FlatList,ActivityIndicator, Alert,StyleSheet,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from "react-native-image-picker"
import Tags from "react-native-tags";
import Axios from 'axios'
import base_url from '../../../base_url'
import MultiSelect from 'react-native-multiple-select';
let colors = []
let sizes = []
export default class Additem extends React.Component {
  constructor(props){
    super(props)
    this.colorRef = ''
    this.sizeRef = ''
    this.state = {
      product_image1:'',
      product_image2:'',
      product_image3:'',
      colors:[],
      sizes:[],
      hash_tags:[],
      product_name:'',
      product_description:'',
      sku_code:'',
      hash_tag:'',
      price:'',
      currency:'',
      all_colors:[],
      all_sizes:[],
      add_product_loading:false,
  }

  }
   
    pickImage1 =  () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({product_image1: data});
        })
        
      }
        })
    
     
      }


      validate = ()=>{
        if(this.state.product_image1 == '' || this.state.product_image2 == '' || this.state.product_image3 == ''){
          Alert.alert("3 product images are required")
          return false
        }

        if(this.state.hash_tag == ''){
          Alert.alert("Hash tag is required")
        }


        if(this.state.product_name == ''){
          Alert.alert("Product Name Field is required")
          return false

        }
        
        if(this.state.currency == ''){
          Alert.alert("Please Go to Profile Page and set your currency")
          return false
        }
      

       

        return true
      }

      pickImage2 = async () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({product_image2: data});
        })
        
      }
        })
     
      }

      getCurrency = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        Axios.get(base_url+'/apis/user/get_currency?user_id='+parse._id)
        .then(res=>{
          this.setState({currency:res.data.currency})
        })
      }
      pickImage3 = async () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({product_image3: data});
        })
        
      }
        })
     
      }
      ColoronSelect = colors=> {
     this.setState({colors})
    } 
    
   


    SizeonSelect = sizes=> {
      this.setState({sizes})

    } 



    getHashTags = async()=>{
      const user = await AsyncStorage.getItem("user")
      const parse = JSON.parse(user)
      Axios.get(base_url+'/apis/hash_tag/get_hashtags?user_id='+parse._id)
      .then(res=>{
        console.log(res.data.hash_tags)
        this.setState({hash_tags:res.data.hash_tags})
      })
    }


    add_item = async()=>{
      const user = await AsyncStorage.getItem("user")
      const parse = JSON.parse(user)
      const validated = this.validate()

      if(validated){
        this.setState({is_loading:true})
       
        var formData= new FormData()

       
          formData.append('item_name',this.state.product_name)
          formData.append('item_description',this.state.product_description)
          formData.append('price',this.state.price)
          formData.append('sku_code',this.state.sku_code)
          formData.append('colors',this.state.colors.toString())
          formData.append('sizes',this.state.sizes.toString())
          formData.append('currency',this.state.currency)

          formData.append('hash_tag',this.state.hash_tag)
          formData.append('added_by',parse._id)

          
          formData.append('image1',{
            name: this.state.product_image1.fileName,
            type: this.state.product_image1.type,
            uri: Platform.OS === 'ios' ? this.state.product_image1.uri.replace('file://', '') : this.state.product_image1.uri,
          })
        formData.append('image2',{
            name: this.state.product_image2.fileName,
            type: this.state.product_image2.type,
            uri: Platform.OS === 'ios' ? this.state.product_image2.uri.replace('file://', '') : this.state.product_image2.uri,
          })


         formData.append('image3',{
            name: this.state.product_image3.fileName,
            type: this.state.product_image3.type,
            uri: Platform.OS === 'ios' ? this.state.product_image3.uri.replace('file://', '') : this.state.product_image3.uri,
          })


       
       

        








       
          // fetch(base_url+'/apis/item/add_item',{
          //   body:formData,
          //   method: 'POST',
          // })
          // .then(res=>{
          //   this.setState({
          //     product_image2:'',
          //     product_image1:'',
  
          //     product_image3:'',
          //     colors:null,
             
          //     product_name:'',
          //     product_description:'',
          //     sku_code:'',
          //     hash_tag:'',
          //     price:'',
              
          //   },()=>{
          //     this.setState({is_loading:false})
          //   })
          //    Alert.alert("Added Succesfully")

          // })
          // .catch(err=>{
          //   Alert.alert("Something Went Wrong")
          //   this.setState({is_loading:false})
          // })
          

          try{
            fetch(base_url+'/apis/item/add_item',{
              body:formData,
              method: 'POST',
            })
            this.setState({
              product_image2:'',
              product_image1:'',
  
              product_image3:'',
               
              product_name:'',
              product_description:'',
              sku_code:'',
              hash_tag:'',
              price:'',
              is_loading:false
            })
            Alert.alert("Added Succesfully")
  
          }catch(err){
            Alert.alert("Something Went Wrong")
            this.setState({is_loading:false})
          }
          
      
      
      
      }
      
        

    }

    get_colors = async()=>{
      const user = await AsyncStorage.getItem("user")
      const parse = JSON.parse(user)
      Axios.get(base_url+'/apis/colors/get_colors?user_id='+parse._id)
      .then(res=>{
        let colors = []
        res.data.colors.forEach(data=>{
          colors.push({name:data.color,id:data.color})

        })
          this.setState({all_colors:colors})
      })

  }
  get_sizes = async()=>{
    const user = await AsyncStorage.getItem("user")
    const parse = JSON.parse(user)
    Axios.get(base_url+'/apis/sizes/get_sizes?user_id='+parse._id)
    .then(res=>{
      let sizes =[]
        res.data.sizes.forEach(data=>{
          sizes.push({name:data.size,id:data.size})
        })
        this.setState({all_sizes:sizes})
    })

}
    componentDidMount(){
      this.getHashTags()
      this.get_colors()
      this.get_sizes()
      this.getCurrency()
      this.props.navigation.addListener("focus",()=>{
        this.getHashTags()
      this.get_colors()
      this.get_sizes()
        this.getCurrency()

      })
    }

    render(){
        return (
            <View  style={{marginTop:20,alignItems: 'center',flex:1}}>
            <FlatList showsVerticalScrollIndicator={false} keyExtractor={(item)=>item.id} data={[{id:'sdsd'}]} renderItem={()=>(
              <View>
                
                   
                <View style={{ flexDirection:'row',flexWrap:'wrap',justifyContent: 'space-between',marginTop:20 }}>
                    <TouchableOpacity onPress={this.pickImage1} style={{ borderWidth:1,borderColor:'#193ed1',alignItems:'center',justifyContent:'center',padding:10,width:100,height:100,borderRadius:5 }}>
                    {this.state.product_image1.uri?<Image style={{width:90,height:90,borderRadius:5}} source={{uri: this.state.product_image1.uri}}/>:<Image style={{width:90,height:90,borderRadius:5}} source={require('../../../assets/images/pick_image.png')}/>}
                      
                    </TouchableOpacity>


                    <TouchableOpacity onPress={this.pickImage2} style={{ borderWidth:1,borderColor:'#193ed1',alignItems:'center',justifyContent:'center',padding:10,width:100,height:100,borderRadius:5 }}>
                    {this.state.product_image2.uri?<Image style={{width:90,height:90,borderRadius:5}} source={{uri: this.state.product_image2.uri}}/>:<Image style={{width:90,height:90,borderRadius:5}} source={require('../../../assets/images/pick_image.png')}/>}
                    </TouchableOpacity>


                    <TouchableOpacity onPress={this.pickImage3} style={{ borderWidth:1,borderColor:'#193ed1',alignItems:'center',justifyContent:'center',padding:10,width:100,height:100,borderRadius:5,marginRight:10 }}>
                        <Image source={this.state.product_image3.uri?{uri:this.state.product_image3.uri}:require('../../../assets/images/pick_image.png')} style={{width:90,height:90,borderRadius:5}}/>
                    </TouchableOpacity>

                    </View>
           
            <Text style={{ marginTop:20 }}>HashTag*</Text>

            <View style={{ borderWidth:1,borderColor:'#57b5b6',borderRadius:5,width:Dimensions.get('window').width*2/2.2,marginTop:7,height:50 }}>
            <Picker

            selectedValue={this.state.hash_tag}
            onValueChange={(val)=>{this.setState({hash_tag:val})}}

            mode="dropdown">
            <Picker.Item label="Select HashTag"  value=" " />

            {this.state.hash_tags.map(data=>{
              
            return <Picker.Item label={data.hash_tag}  value={data.hash_tag} />

            })}
           

            

            </Picker>
            
            </View>



            <View>
                <Text style={{ marginTop:20 }}>Add name*</Text>

                <TextInput value={this.state.product_name} onChangeText={(val)=>this.setState({product_name:val})} placeholder=''   
                style={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>


                <View>
                <Text style={{ marginTop:20 }}>Add Price*</Text>

                <TextInput value={this.state.price} keyboardType="numeric" onChangeText={(val)=>this.setState({price:val})} placeholder=''   
                style={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>



            <View >
                <Text style={{ marginTop:20 }}>Describe What you are selling</Text>

                <TextInput multiline = {true}
                onChangeText={(val)=>this.setState({product_description:val})}
                numberOfLines = {2}
                value={this.state.product_description}
                
                placeholder=''   
                style={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
             />
                    
            </View>


                <View>
                <Text style={{ marginTop:20 }}>Add SKU Code</Text>

                <TextInput 
                onChangeText={(val)=>this.setState({sku_code:val})}
                value={this.state.sku_code}
                
                placeholder=''   
                style={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>


           
              

                <Text style={{ marginTop:20 }}>Colors</Text>

               
                <View 
                style={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                
                >

                <MultiSelect
                ref={(component) => { this.colorRef = component }}
          
                  items={this.state.all_colors}
                  uniqueKey="id"
                  onSelectedItemsChange={this.ColoronSelect}
                  selectedItems={this.state.colors}
                  selectText="Pick Colors"
                  searchInputPlaceholderText="Search color..."
                  onChangeInput={ (text)=> console.log(text)}
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="red"
                  tagBorderColor="blue"
                  
                  tagTextColor="blue"
                  selectedItemTextColor="blue"
                  selectedItemIconColor="blue"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="blue"
                  submitButtonText="Submit"
                />


</View>
              


               

             <Text style={{ marginTop:20 }}>Sizes</Text>

        
             <View 
                style={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                
                >


             <MultiSelect
              
          
          items={this.state.all_sizes}
          uniqueKey="id"
          ref={(component) => { this.sizeRef = component }}
          onSelectedItemsChange={this.SizeonSelect}
          selectedItems={this.state.sizes}
          selectText="Pick Sizes"
          searchInputPlaceholderText="Search color..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="red"
          tagBorderColor="blue"
          
          tagTextColor="blue"
          selectedItemTextColor="blue"
          selectedItemIconColor="blue"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="blue"
          submitButtonText="Submit"
        />
              
         </View>
             

                

               
           
            <TouchableOpacity onPress={this.add_item} style={[styles.AddProductBtn,{flexDirection:'row'}]}>
            {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}

                <Text style={{color:'white'}}>Add Product</Text>
            </TouchableOpacity>
              </View>
            )} >
                
                



                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    AddProductBtn:{
        
        backgroundColor:'#193ed1',
        borderRadius:5,
        borderColor:"#193ed1",
        borderWidth:1,
        width:'99%',
        alignSelf: 'center',
        marginTop:20,
      
        justifyContent:'center',
        alignItems: 'center',
        height:50,
        marginBottom:50,
    },
})