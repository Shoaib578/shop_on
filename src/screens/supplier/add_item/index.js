import React from 'react';
import {View,Text,Button, ScrollView, Dimensions,TextInput,TouchableOpacity,Image, ActivityIndicator, Alert,StyleSheet,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from "react-native-image-picker"
import Tags from "react-native-tags";
import Axios from 'axios'
import base_url from '../../../base_url'
export default class Additem extends React.Component {
    state = {
        product_image1:'',
        product_image2:'',
        product_image3:'',
        colors:[],
        hash_tags:[],
        product_name:'',
        product_description:'',
        sku_code:'',
        hash_tag:'',
        price:'',

        add_product_loading:false,
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
        if(this.state.product_image1 == null || this.state.product_image2 == null || this.state.product_image3 == null){
          Alert.alert("3 product images are required")
          return false
        }

        if(this.state.hash_tag == null){
          Alert.alert("Hash tag is required")
        }


        if(this.state.product_name == null){
          Alert.alert("Product Name Field is required")
          return false

        }
        
        if(this.state.product_description == null){
          Alert.alert("Product Description Field is required")
          return false
        }

        if(this.state.colors == null){
          Alert.alert("Color is required")
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
          formData.append('colors',this.state.colors)
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


       
       

        








        try{
          fetch(base_url+'/apis/item/add_item',{
            body:formData,
            method: 'POST',
          })
          this.setState({
            product_image2:'',
            product_image1:'',

            product_image3:'',
            colors:null,
           
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

    componentDidMount(){
      this.getHashTags()
      this.props.navigation.addListener("focus",()=>{
        this.getHashTags()
      })
    }

    render(){
        return (
            <View  style={{marginTop:20,alignItems: 'center',flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                
                
                   
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
                <Text style={{ marginTop:20 }}>Describe What you are selling*</Text>

                <TextInput multiline = {true}
                onChangeText={(val)=>this.setState({product_description:val})}
                numberOfLines = {2}
                value={this.state.product_description}
                
                placeholder=''   
                style={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
             />
                    
            </View>


                <View>
                <Text style={{ marginTop:20 }}>Add SKU Code*</Text>

                <TextInput keyboardType='numeric' 
                onChangeText={(val)=>this.setState({sku_code:val})}
                value={this.state.sku_code}
                
                placeholder=''   
                style={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                />
             

                </View>


           
              





               


              


              
            
             

                

               
                <Text style={{ marginTop:20 }}>Add Colors*</Text>

                <Tags
                initialText={this.state.colors}
                
                textInputProps={{
                placeholder: "Add Colors"
                }}
                initialTags={this.state.colors}
                onChangeTags={tags =>{
                  console.log(tags)
                  this.setState({colors: tags})}}
                onTagPress={(index, tagLabel, event, deleted) =>
                console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                }
                tagContainerStyle={{marginLeft:20,padding:5,borderRadius:5,borderColor:'#193ed1',borderWidth:1,color:'#57b5b6',backgroundColor:'#57b5b6'}}
                containerStyle={{ borderWidth:1,borderColor:'#193ed1',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10 }}
                inputStyle={{ backgroundColor: "white" }}
                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                <TouchableOpacity style={{marginLeft:5,padding:5,borderRadius:5,borderColor:'#193ed1',borderWidth:1,color:'white',backgroundColor:'#57b5b6'}} key={`${tag}-${index}`} onPress={onPress}>
                    <Text>{tag}</Text>
                </TouchableOpacity>
                )}
            />
           
            <TouchableOpacity onPress={this.add_item} style={[styles.AddProductBtn,{flexDirection:'row'}]}>
            {this.state.is_loading?<ActivityIndicator size="large" color="white" />:null}

                <Text style={{color:'white'}}>Add Product</Text>
            </TouchableOpacity>



                </ScrollView>
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