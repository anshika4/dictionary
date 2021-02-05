import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native';
import {Header} from 'react-native-elements';
export default class App extends React.Component {
constructor(){
super();
this.state={
word: '',
definition: '',
noun:'',
}
}

getWord = (word) => {
var searchKeyword=word.toLowerCase()
var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json";
return fetch(url)
.then((data)=>{
if(data.status===200){
return data.json()
}else
{
return null
}
})
.then((response) => {
var responseObject=response;
if(responseObject){
var wordData = responseObject.definitions[0]
var definition =wordData.description
var lexicalCategory=wordData.wordtype
this.setState({
"word":this.state.text,
"definition":definition,
"lexicalCategory":lexicalCategory,
})
}else{
this.setState({
"word":this.state.text,
"definition":'not found',
"lexicalCategory":"not found",
})
}
})
};







render() {
return (
<View style={styles.container}>
<Header backgroundColor={"darkorange"}
centerComponent={{
text:"DICTIONARY APP",
style:{color:'black',fontSize:20}
}}/>

<Image
style={styles.image} 
source={require('./de.jpg')}>
</Image>

<TextInput style={styles.inputBox}
onChangeText={text=>{
this.setState({text:text,
isSearchedPressed:false,
lexicalCategory: '',
examples: [],
definition: '',
})
}}
value={this.state.text}
/>

<TouchableOpacity style={styles.searchButton}
onPress={()=>{
this.setState({isSearchedPressed:true,word:'loading...',})
this.getWord(this.state.text)
}}>
<Text style={styles.buttonText}>Search</Text>
</TouchableOpacity>

<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
<Text style={styles.text} > Word:{""}</Text>
<Text style={styles.displayTextword}>{this.state.word}</Text>
</View>

<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
<Text style={styles.texT}>Type:{""}</Text>
<Text style={styles.displayTextNoun}>{this.state.lexicalCategory}</Text>
</View>

<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
<Text style={styles.Text}>Definition:{""}</Text>
<Text style={styles.displayTextdefinition}>{this.state.definition}</Text>
</View>
</View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor:'crimson',
},
inputBox: {
marginTop: 50, 
width: '80%',
alignSelf: 'center', 
height: 40, 
textAlign: 'center', 
borderWidth: 4, 
},
searchButton: { 
width: '50%', 
height: 55, 
alignSelf: 'center', 
padding: 10,
margin: 10, 
},
buttonText: { 
textAlign: 'center', 
fontSize: 30,
fontWeight: 'bold', 
},
text: { 
textAlign: 'center', 
fontSize: 30,
fontWeight: 'bold', 
marginLeft:-1, 
color:"yellow",
},
texT: { 
textAlign: 'center', 
fontSize: 30,
fontWeight: 'bold', 
marginLeft:5, 
color:"yellow",
},
Text: { 
textAlign: 'center', 
fontSize: 30,
fontWeight: 'bold', 
marginLeft:5, 
color:"yellow",
},
displayTextNoun: { 
fontSize:18,
marginTop:12
},
displayTextdefinition: { 
fontSize:18,
},
displayTextword:{
fontSize:18,
marginTop:10
},
image:{
width: 130,
height: 130,
borderColor: 'black',
borderWidth: 10,
marginTop: 20,
marginLeft: 100,
}
});
