import React from 'react';
import { View, Text,Button,TextInput,Stylesheet,Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


export default class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state={name: "",
    backgroundColor: '#757083',
    messages: [],};
  }

  componentDidMount() {

    let {name,backgroundColor} = this.props.route.params;
    this.props.navigation.setOptions({title:name,
      backgroundColor: backgroundColor
    });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello ' + (name),
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
         },
         {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#007fff'
          }
        }}
      />
    )
  }
  
  


  render() {
    let {name,backgroundColor} = this.props.route.params;
    this.props.navigation.setOptions({title:name,
      backgroundColor: backgroundColor
    });
    return (
     
      <View style={{flex:1, backgroundColor: backgroundColor}}>
     
     <GiftedChat
   renderBubble={this.renderBubble.bind(this)}
   messages={this.state.messages}
   onSend={messages => this.onSend(messages)}
   user={{
     _id: 1,
   }}
 />
        {/* <Button
        title="Go to Start"
        onPress={()=>this.props.navigation.navigate("Start")}
        /> */}
        {/* <Text>Hello Screen2!</Text> */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
      </View>
    )
  }
}