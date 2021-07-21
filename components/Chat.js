import React from 'react';
import { View, Text,Button,TextInput, StyleSheet,Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


const firebase = require('firebase');
  require('firebase/firestore');


export default class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state={
    name: "",
    backgroundColor: '#757083',
    messages: [],
    uid: 0
  };

  const firebaseConfig = {
    apiKey: "AIzaSyA6SsnBQasoOu0s19Q_kmOLQQhwrJ9jRGU",
    authDomain: "chatapp-348df.firebaseapp.com",
    projectId: "chatapp-348df",
    storageBucket: "chatapp-348df.appspot.com",
    messagingSenderId: "852661635541",
    appId: "1:852661635541:web:0477e3c0cdecc61322555c",
    measurementId: "G-HH1NLCK1XS"
  }
   if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
       }

  this.referenceChatMessages = firebase
  .firestore()
  .collection("messages");

  }

  
  componentDidMount() {

    let {name,backgroundColor} = this.props.route.params;
    this.props.navigation.setOptions({title:name,
      backgroundColor: backgroundColor
    });

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
       firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


    addMessage(){
      const message = this.state.messages[0];
      this.referenceChatMessages.add({
        _id: message._id,
        createdAt: message.createdAt,
        text: message.text,
        user: message.user,
      });
    } 

    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        let data = doc.data();
        messages.push({
          _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        });
      });
      this.setState({
        messages,
      });
    };
  


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    ()=>{
      this.addMessage();
    }
    )
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
     
      <View style={styles.container,{flex:1, backgroundColor: backgroundColor}}>
     
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,     
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});