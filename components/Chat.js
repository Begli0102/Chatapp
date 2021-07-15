import React from 'react';
import { View, Text,Button,TextInput,Stylesheet} from 'react-native';


export default class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state={name: "",
    backgroundColor: '#757083'};
  }
  render() {
    let {name,backgroundColor} = this.props.route.params;
    this.props.navigation.setOptions({title:name});
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor}}>
        <Button
        title="Go to Start"
        onPress={()=>this.props.navigation.navigate("Start")}
        />
        {/* <Text>Hello Screen2!</Text> */}
      </View>
    )
  }
}