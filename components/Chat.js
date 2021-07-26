import React from 'react';
import { View, Text,Button,TextInput, StyleSheet,Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat, Bubble,InputToolbar } from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const firebase = require('firebase');
  require('firebase/firestore');


export default class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state={
    name: "",
    backgroundColor: this.props.route.params.backgroundColor,
    messages: [],
    uid: 0,
     isConnected: false
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

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  componentDidMount() {

    let {name,backgroundColor} = this.props.route.params;
    this.props.navigation.setOptions({title:name,
      backgroundColor: backgroundColor
    });

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
         this.setState({ isConnected: true });
        console.log('You are online');
        // this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        //   if (!user) {
        //    firebase.auth().signInAnonymously();
        //   }
        //   this.setState({
        //     uid: user.uid,
        //     user: {
        //       _id: user.uid,
        //       name: name
        //     },
        //     messages: [],
        //   });
        //   this.unsubscribe = this.referenceChatMessages
        //     .orderBy("createdAt", "desc")
        //     .onSnapshot(this.onCollectionUpdate);
        // });
      } else {
        console.log('You are offline');
        this.getMessages();
        this.setState({ isConnected: false });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();

  }


    addMessages(){
      const message = this.state.messages[0];
      this.referenceChatMessages.add({
        _id: message._id,
        createdAt: message.createdAt,
        text: message.text || null,
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
    }),()=>{
      this.addMessages();
      this.saveMessages();

    }
    )
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }


  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
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
  
  renderInputToolbar = props => {
    if (this.state.isConnected === false) {
  // renderInputToolbar(props) {
  //   if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
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
  //  renderInputToolbar={this.renderInputToolbar}
  renderInputToolbar={this.renderInputToolbar.bind(this)}
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